import { TokenInfo } from "./CompilerPhases/lexicalAnaysis/tokenClassifier";
export function lexicalOutputForFile(lexemesPerCodeLine: string[][]): string {
  let lexicalOutputString = "";
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
  let outputString = "";
  for (let codeLine of tokenList) {
    for (let token of codeLine) {
      outputString += token.lexeme + "  " + token.tokenType + "\n";
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
