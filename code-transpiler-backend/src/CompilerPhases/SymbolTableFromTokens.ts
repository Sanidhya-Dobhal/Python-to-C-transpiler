interface Token {
  lexeme: string;
  tokenType: string;
}

interface SymbolEntry {
  name: string;
  type: string;
  value: string;
  c_var: string;
  datatype: string;
}

export function generateSymbolTableFromTokens(
  tokenLines: Token[][]
): SymbolEntry[] {
  const symbolTable: SymbolEntry[] = [];

  const evaluateExpression = (
    tokens: Token[]
  ): { value: string; datatype: string } => {
    let expression = "";
    let isString = false;

    for (const token of tokens) {
      if (token.tokenType === "identifier") {
        const entry = symbolTable.find((e) => e.name === token.lexeme);
        expression += entry ? entry.value : token.lexeme;
        if (entry?.datatype === "string") isString = true;
      } else if (token.tokenType === "string_literal") {
        expression += token.lexeme;
        isString = true;
      } else if (token.tokenType === "punctuation" && token.lexeme === '"') {
        // skip quotes
      } else {
        expression += token.lexeme;
      }
    }

    try {
      const result = eval(isString ? "`" + expression + "`" : expression);
      return {
        value: result.toString(),
        datatype: isString ? "string" : "number",
      };
    } catch (err) {
      console.error("Evaluation failed for expression:", expression);
      return {
        value: "NaN",
        datatype: "number",
      };
    }
  };

  for (const lineTokens of tokenLines) {
    const assignIndex = lineTokens.findIndex(
      (token) => token.tokenType === "Assign_op"
    );

    if (assignIndex !== -1 && assignIndex > 0) {
      const identifier = lineTokens[assignIndex - 1];
      const rhsTokens = lineTokens.slice(assignIndex + 1);

      const { value, datatype } = evaluateExpression(rhsTokens);
      const existingIndex = symbolTable.findIndex(
        (entry) => entry.name === identifier.lexeme
      );

      if (existingIndex !== -1) {
        symbolTable[existingIndex].value = value;
        symbolTable[existingIndex].datatype = datatype;
      } else {
        symbolTable.push({
          name: identifier.lexeme,
          type: identifier.tokenType,
          value,
          c_var: `t${symbolTable.length + 1}`,
          datatype,
        });
      }
    } else {
      for (const token of lineTokens) {
        if (token.tokenType === "identifier") {
          const exists = symbolTable.find(
            (entry) => entry.name === token.lexeme
          );
          if (!exists) {
            symbolTable.push({
              name: token.lexeme,
              type: token.tokenType,
              value: "",
              c_var: `t${symbolTable.length + 1}`,
              datatype: "",
            });
          }
        }
      }
    }
  }

  return symbolTable;
}
