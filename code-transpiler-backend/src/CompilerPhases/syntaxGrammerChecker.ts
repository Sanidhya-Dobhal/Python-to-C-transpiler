export function syntaxGrammarCheck(lines: string[]): string[] {
  const results: string[] = [];

  for (const line of lines) {
    const wordsInLOC = line.trim().split(/\s+/);
    let flag = false;

    if(wordsInLOC.length==1 && wordsInLOC[0]==='')
    {
      results.push('✅ New line');
    }
    else if (wordsInLOC[0] === "identifier" && wordsInLOC[1] === "Assign_op") {
      // Possible string assignment
      if (
        wordsInLOC.length === 5 && 
       checkQuotedStringLiteralFromTokens(wordsInLOC, 2)
      ) {
        results.push("✅ String assignment");
        flag = true;
      } else {
        // Check for numeric expression assignment
        flag = true;
        for (let i = 2; i < wordsInLOC.length; i++) {
          if (i === wordsInLOC.length - 1) {
            //last token can't be a Arth_operator
            if (wordsInLOC[i] === "Arth_operator") {
              flag = false;
              break;
            }
          }
          if (i % 2 === 0) {
            if (!(wordsInLOC[i] === "num_literal" || wordsInLOC[i] === "identifier")) {
              flag = false;
              break;
            }
          } else {
            if (wordsInLOC[i] !== "Arth_operator") {
              flag = false;
              break;
            }
          }
        }
        results.push(flag ? "✅ Numeric assignment" : `❌ Invalid syntax`);
      }
    } else if (wordsInLOC[0] === "print_func" && wordsInLOC[1] === "punctuation(") {
      let validPrint = false;
      if(wordsInLOC.length===3 && wordsInLOC[2]==="punctuation)"){//For "print()"
        validPrint =true;
      }
      let i = 2;
      while (i < wordsInLOC.length) {
        if (wordsInLOC[i] === "identifier" || wordsInLOC[i] === "num_literal") {
          validPrint = true;
          i++;
        } else if (
          checkQuotedStringLiteralFromTokens(wordsInLOC, i)
        ) {
          validPrint = true;
          i += 3;
        } else if (wordsInLOC[i] === "punctuation,") {
          validPrint = false;
          i++;
        } else if (
          wordsInLOC[i] === "punctuation)" &&
          i === wordsInLOC.length - 1 &&
          validPrint
        ) {
          flag = true;
          break;
        } else {
          flag = false;
          break;
        }
      }
      results.push(flag ? "✅ Print statement" : `❌ Invalid syntax`);
    } else {
      results.push(`❌ Invalid syntax`);
    }
  }

  return results;
}

function checkQuotedStringLiteralFromTokens(wordsInLOC:string[], startIndex:number) {
  return  (
    (wordsInLOC[startIndex] === 'punctuation"' && wordsInLOC[startIndex + 1] === "string_literal" && wordsInLOC[startIndex + 2] ==='punctuation"')
    ||
    (wordsInLOC[startIndex] === "punctuation'" && wordsInLOC[startIndex + 1] === "string_literal" && wordsInLOC[startIndex + 2] === "punctuation'")
    );
}