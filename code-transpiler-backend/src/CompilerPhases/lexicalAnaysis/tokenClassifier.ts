export type TokenInfo = {
  lexeme: string;
  tokenType: string;
};

const python_keywords = [
  "and",
  "as",
  "assert",
  "break",
  "class",
  "continue",
  "def",
  "del",
  "elif",
  "else",
  "except",
  "False",
  "finally",
  "for",
  "from",
  "global",
  "if",
  "import",
  "in",
  "is",
  "lambda",
  "None",
  "nonlocal",
  "not",
  "or",
  "pass",
  "raise",
  "return",
  "True",
  "try",
  "while",
  "with",
  "yield",
];
export function tokenClassifier(lexemeLines: string[][]): TokenInfo[][] {
  const result: TokenInfo[][] = [];
  let make_string_flag = false;

  for (const line of lexemeLines) {
    const processedLine: TokenInfo[] = [];

    for (const token of line) {
      let tokenType = "";
      const isKeyword = python_keywords.includes(token);

      if (make_string_flag) {
        if (token === '"') {
          tokenType = 'punctuation"';
          make_string_flag = false;
        } else {
          tokenType = "string_literal";
        }
      } else if (isKeyword) {
        tokenType = "keyword";
      } else if (token.length === 1 && isPunctuation(token)) {
        switch (token) {
          case "+":
          case "-":
          case "*":
          case "/":
          case "%":
            tokenType = "Arth_operator";
            break;
          case "<":
          case ">":
            tokenType = "rel_op";
            break;
          case "=":
            tokenType = "Assign_op";
            break;
          case '"':
            tokenType = 'punctuation"';
            make_string_flag = true;
            break;
          default:
            tokenType = "punctuation" + token;
        }
      } else if (token.length === 2 && isPunctuation(token[0])) {
        if (["<=", ">=", "==", "!="].includes(token)) {
          tokenType = "rel_op";
        } else {
          throw new Error(`Token "${token}" not recognised by the grammar`);
        }
      } else if (token === "print") {
        tokenType = "print_func";
      } else if (isIdentifier(token) && !isKeyword) {
        tokenType = "identifier";
      } else if (isNumber(token)) {
        tokenType = "num_literal";
      } else if (token.trim() === "") {
        continue;
      } else {
        console.log(`Error while classifying ${token} as token`);
      }

      processedLine.push({ lexeme: token, tokenType });
    }

    result.push(processedLine);
  }
  return result;
}

function isPunctuation(ch: string): boolean {
  return /^[^\w\s]$/.test(ch); // not alphanumeric or whitespace
}

function isIdentifier(token: string): boolean {
  return /^[A-Za-z_][A-Za-z0-9_]*$/.test(token);
}

function isNumber(token: string): boolean {
  return /^([0-9]+(\.[0-9]+)?|\.[0-9]+|[0-9]+\.)$/.test(token);
}