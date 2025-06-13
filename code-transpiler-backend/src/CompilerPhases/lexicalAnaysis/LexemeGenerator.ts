export function lexemeGenerator(
  inputCode: string
): string[][] | { error: string } {
  const appendLex = () => {
    //push the new lexeme and flush the variable
    if (lex.length > 0) {
      output.push(lex);
      console.log(lex);
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
      while (index < inputCode.length && inputCode[index] !== '"') {
        lex += inputCode[index];
        index++;
      }
      output.push(lex);
      console.log(lex);
      lex = "";
      //   i = 0;
      output.push('"');
      //   console.log('"');
      //   index++;
    } else if (isPunct(ch)) {
      appendLex();
      const nextCh = inputCode[index + 1] ?? "";
      if (["=", "!", "<", ">"].includes(ch)) {
        const [relOp, isTwoCharRelOp] = completeRelationalToken(ch, nextCh);
        output.push(relOp);
        index += isTwoCharRelOp ? 1 : 0;
      } else {
        output.push(ch);
        console.log("output is", output);
      }
    } else if (ch === ".") {
      console.log("line 48");
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
function completeRelationalToken(
  ch: string,
  nextCh: string
): [string, boolean] {
  if (
    (ch === "=" && nextCh === "=") ||
    (ch === "!" && nextCh === "=") ||
    (ch === "<" && nextCh === "=") ||
    (ch === ">" && nextCh === "=")
  ) {
    return [ch + nextCh, true];
  } else {
    return [ch, false];
  }
}
