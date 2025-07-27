export function lexemeGenerator(
  inputCode: string
): string[][] | { error: string } {
  const appendLex = () => {
    //push the new lexeme and flush the variable
    if (lex.length > 0) {
      output.push(lex);
      lex = "";
      i = 0;
    }
  };
  let lexemesLines: string[][] = [];
  console.log("Code =", inputCode);
  let lex = "";
  let i = 0;
  let index = 0;
  let output: string[] = [];
  while (index < inputCode.length) {
    let ch = inputCode[index];

    if (ch === '"') {
      appendLex(); // Flush previous token
      output.push('"');
      index++;
      while (index < inputCode.length && inputCode[index] !== '"' && inputCode[index]!='\n') {
        lex += inputCode[index];
        index++;
      }
      if(!(inputCode[index]==='"')) {
        return {error: "SyntaxError: Unterminated string detected in lexical analysis"}
      }
      output.push(lex);
      console.log(lex);
      lex = "";
      output.push('"');
      //   index++;
    } else if(ch ==="'") {
      appendLex(); // Flush previous token
      output.push("'");
      index++;
      let hasStringTerminated = false;
      while (index < inputCode.length && inputCode[index] !== "'" && inputCode[index]!='\n') {
        lex += inputCode[index];
        index++;
      }
      if(!(inputCode[index] === "'")) {
        return {error: "SyntaxError: Unterminated string detected in lexical analysis"}
      }
      output.push(lex);
      lex = "";
      output.push("'");
    } 
    else if (isPunct(ch)) {
      appendLex();
      const nextCh = inputCode[index + 1] ?? "";
      if (["=", "!", "<", ">"].includes(ch)) {
        if(nextCh === "=") {
          output.push(ch + nextCh);
          index+=1;
        }
        else {
          output.push(ch);
        }
      } else {
        output.push(ch);
        console.log("output is", output);
      }
    } else if (ch === ".") {
      //Checking if the character '.' can be part of a number or not
      if (!isNaN(Number(lex)) && lex.length > 0) {
        //Before '.'
        lex = lex + ".";
        console.log(lex);
      } else if (inputCode[index + 1] && !isNaN(Number(inputCode[index + 1]))) {
        let termAfterDecimalToWhiteSpace = "";
        let tempIndexTillLineBreak = index + 1;
        while (
          inputCode[tempIndexTillLineBreak] !== " " &&
          inputCode[tempIndexTillLineBreak] !== "\n"
        ) {
          termAfterDecimalToWhiteSpace += inputCode[tempIndexTillLineBreak];
          tempIndexTillLineBreak++;
        }
        console.log("term after Decimal", termAfterDecimalToWhiteSpace);
        const lexemeGenOut = lexemeGenerator(
          termAfterDecimalToWhiteSpace + "\n"
        );
        if ("error" in lexemeGenOut) {
          return lexemeGenOut;
        }
        const termAfterPoint = lexemeGenOut[0][0];
        if (!isNaN(Number(termAfterPoint))) {
          lex += "." + termAfterPoint;
          index += termAfterPoint.length;
        } else {
          console.log(
            "Lexical error near",
            termAfterPoint,
            "\nWas expecting number"
          );
          return {
            error: `Lexical error: Number was expected near ${termAfterPoint}`,
          };
        }
      } //After '.'
      else {
        console.log("In else for", lex);
        appendLex();
        output.push(".");
      }
    } else if (ch !== " " && ch !== "\n") {
      lex += ch;
      //   i++;
      //   index++;
    } else {
      appendLex();
      if (ch === "\n") {
        lexemesLines.push(output);
        output = [];
      }
    }
    index++;
  }
  console.log("lexemesLines", lexemesLines);
  return lexemesLines;
}

function isPunct(ch: string): boolean {
  const punctuations = `!#$%&'()*+,-/:;<=>?@[\\]^_\`{|}~`;
  return punctuations.includes(ch);
}