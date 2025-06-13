type Token = { lexeme: string; tokenType: string };
export function simplifyTokensForSyntaxEvaluation(
  tokenList: Token[][]
): string[] {
  const simplified: string[] = [];

  for (const line of tokenList) {
    const simplifiedLine: string[] = [];

    for (const token of line) {
      if (token.tokenType === "string_literal") {
        simplifiedLine.push("string_literal");
      } else {
        simplifiedLine.push(token.tokenType);
      }
    }

    simplified.push(simplifiedLine.join(" "));
  }
  console.log("simplified is ", simplified);
  return simplified;
}
