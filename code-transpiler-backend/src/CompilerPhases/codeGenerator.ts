interface SymbolEntry {
  name: string;
  type?: string;
  value?: string;
  cVariable: string;
  datatype: string;
}
let symbolTable: SymbolEntry[] | undefined;
export function codeGenerator(
  statementValidity: string[],
  lexemesPerCodeLine: string[][],
  simplifiedTokenRep: string[]
) {
  let finalTranspiledCode = `#include <stdio.h>\nint main(){
  `;
  for (let i in statementValidity) {
    let instruction = instructionGenerator(
      statementValidity[i],
      lexemesPerCodeLine[i],
      simplifiedTokenRep[i].split(" ")
    );
    if (typeof instruction !== "string") {
      return instruction;
    }
    finalTranspiledCode += "\t"+instruction;
  }

  symbolTable = undefined; //needs to be undefined for the next code to compile
  return finalTranspiledCode + "\n\treturn 0;\n}\n";
}

function instructionGenerator(
  statementType: string,
  lexemesPerCodeLine: string[],
  instructionsTokenType: string[]
) {
  let outputLine = "";
  if (statementType === "Valid numeric assignment") {
    let doesExist = false;
    const identifier = lexemesPerCodeLine[0];
    const RHSTokens = lexemesPerCodeLine.slice(2);
    const RHSTokenTypes = instructionsTokenType.slice(2);
    if (symbolTable) {
      doesExist = isVariableInSymbolTable(identifier);
    } else {
      symbolTable = [
        {
          name: identifier,
          datatype: "double ",
          type: "num_id",
          cVariable: identifier,
        },
      ];
      doesExist = true;
      outputLine += "double ";
    }
    if (!doesExist) {
      outputLine += "double ";
      symbolTable.push({
        name: identifier,
        datatype: "double ",
        type: "num_id",
        cVariable: identifier,
      });
    }
    // let cIdentifierOutput = getVariableInC(identifier);
    // if (typeof cIdentifierOutput === "string") {
    //   outputLine += cIdentifierOutput;
    // }
    outputLine += identifier + " = ";

    // checked for the identifier, now evaluating the RHS of the expression.
    for (let i in RHSTokens) {
      if (RHSTokenTypes[i] === "identifier") {
        if (!isVariableInSymbolTable(RHSTokens[i]))
          return {
            error:
              "Error: Identifier " +
              RHSTokens[i] +
              " is used but never assigned",
          };
        else {
          outputLine += RHSTokens[i];
        }
      } else if (
        RHSTokenTypes[i] === "Arth_operator" ||
        RHSTokenTypes[i] === "num_literal"
      ) {
        outputLine += RHSTokens[i];
      }
    }
  } else if (statementType === "Valid string assignment") {
    let doesExist = false;
    const identifier = lexemesPerCodeLine[0];
    const RHSTokens = lexemesPerCodeLine.slice(2);
    if (symbolTable) {
      doesExist = isVariableInSymbolTable(identifier);
    } else {
      symbolTable = [
        {
          name: identifier,
          datatype: "String ",
          type: "String_id",
          cVariable: identifier,
        },
      ];
      doesExist = true;
      outputLine += "char *";
    }
    if (!doesExist) {
      outputLine += "char *";
      symbolTable.push({
        name: identifier,
        datatype: "string ",
        type: "strin_id",
        cVariable: identifier,
      });
    }
    outputLine += identifier + " = ";
    for (let tokenIndex in RHSTokens) {
      outputLine += RHSTokens[tokenIndex];
    }
  } else if (statementType === "Valid print statement") {
    outputLine += "printf(";
    let printContent = lexemesPerCodeLine.slice(2);
    let printContentTokType = instructionsTokenType.slice(2);
    let templateString = "";
    let printArgumentsString = "";
    for (let tokenIndex in printContent) {
      //Might need a lot of work.
      let tokenIndexNumber = Number(tokenIndex);
      if (
        printContent[tokenIndexNumber] === ")"
      ) {
          outputLine += '"'+templateString+'\\n"'+(printArgumentsString?",":"")+printArgumentsString+")";//ternary operator required for empty print()
          break;
      }
      if(printContentTokType[tokenIndex]==="string_literal")
        templateString +="%s ";
      if(printContentTokType[tokenIndex]==="num_literal"){//here num_literal is hardcoded as type int but can also be double
        templateString +="%d ";
      }
      if(printContentTokType[tokenIndex]==="identifier")
      {
        let currentDatatype = getVariableDetails(printContent[tokenIndex],"datatype");
        if(currentDatatype && typeof currentDatatype!=="string")
        {
          return currentDatatype;
        }
        else if(currentDatatype?.trim() === "string"){
           templateString +="%s ";
        }
        else if(currentDatatype?.trim() === "double"){
          templateString+="%f ";
        }
      }
      printArgumentsString += printContent[tokenIndexNumber];
    }
  } else if(statementType ==="Valid new line"){
    return "\n";
  } 
  else if (statementType === "Invalid syntax") {
    return { error: "Error: Invalid Syntax" };
  }
  return outputLine + ";\n";
}

function isVariableInSymbolTable(identifier: string) {
  let doesExist = false;
  if (!symbolTable) {
    return false;
  }
  for (let entry of symbolTable) {
    if (entry?.name === identifier) {
      doesExist = true;
    }
  }
  return doesExist;
}

function getVariableDetails(identifier: string,detail:"cVariable"|"datatype") {
  if (isVariableInSymbolTable(identifier)) {
    if (!symbolTable) {
      return { error: "Problem on our side: Symboltable not present" };
    }
    for (let entry of symbolTable) {
      if (entry?.name === identifier) {
        return entry[detail];
      }
    }
  } else {
    return { error: `Invalid variable: ${identifier}` };
  }
}
