import { SymbolEntry } from "./CompilerPhases/codeGenerator";
import { TokenInfo } from "./CompilerPhases/lexicalAnaysis/tokenClassifier";
export function lexicalOutputForFile(lexemesPerCodeLine: string[][]): string {
  let lexicalOutputString = "Lexeme List\n-----------\n";
  let line, lexeme;
  for (line of lexemesPerCodeLine) {
    for (lexeme of line) {
      lexicalOutputString += lexeme + "\n";
    }
    lexicalOutputString += "\n";
  }
  return lexicalOutputString;
}
export function tokenListOutputForFile(tokenList: TokenInfo[][]): string {
  let outputString = "Token List\n----------\n";
  for (let codeLine of tokenList) {
    for (let token of codeLine) {
      outputString += token.lexeme + " - " + token.tokenType + "\n";
    }
    outputString += "\n";
  }
  return outputString;
}

export function oneDStrArrayToMultilineStr(stringArray: string[]) {
  let outputString = "";
  for (let singleLine of stringArray) {
    outputString += singleLine + "\n";
  }
  return outputString;
}

export function symbolTableForFile(symbolTable:SymbolEntry[]):string {
  let outputString = "Symbol Table (variable-datatype)\n--------------------------------\n\n"
  if(!symbolTable.length) {
    return outputString+ "No variables used in the code\n";
  }
  for (let i in symbolTable) {
    outputString += (symbolTable[i].name ?? "") + " - " + (symbolTable[i].datatype ?? "")+ "\n";
  }
  return outputString;
}
