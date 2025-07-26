export function syntaxGrammarCheck(lines: string[]): string[] {
  const results: string[] = [];

  for (const line of lines) {
    const words = line.trim().split(/\s+/);
    let flag = false;

    if(words.length==1 && words[0]==='')
    {
      results.push('✅ New line');
    }
    else if (words[0] === "identifier" && words[1] === "Assign_op") {
      // Possible string assignment
      if (
        words.length === 5 &&
        words[2] === 'punctuation"' &&
        words[3] === "string_literal" &&
        words[4] === 'punctuation"'
      ) {
        results.push("✅ String assignment");
        flag = true;
      } else {
        // Check for numeric expression assignment
        flag = true;
        for (let i = 2; i < words.length; i++) {
          if (i === words.length - 1) {
            //last token can't be a Arth_operator
            if (words[i] === "Arth_operator") {
              flag = false;
              break;
            }
          }
          if (i % 2 === 0) {
            if (!(words[i] === "num_literal" || words[i] === "identifier")) {
              flag = false;
              break;
            }
          } else {
            if (words[i] !== "Arth_operator") {
              flag = false;
              break;
            }
          }
        }
        results.push(flag ? "✅ Numeric assignment" : `❌ Invalid syntax`);
      }
    } else if (words[0] === "print_func" && words[1] === "punctuation(") {
      let validPrint = false;
      if(words.length===3 && words[2]==="punctuation)"){//For "print()"
        validPrint =true;
      }
      let i = 2;
      while (i < words.length) {
        if (words[i] === "identifier" || words[i] === "num_literal") {
          validPrint = true;
          i++;
        } else if (
          words[i] === 'punctuation"' &&
          words[i + 1] === "string_literal" &&
          words[i + 2] === 'punctuation"'
        ) {
          validPrint = true;
          i += 3;
        } else if (words[i] === "punctuation,") {
          validPrint = false;
          i++;
        } else if (
          words[i] === "punctuation)" &&
          i === words.length - 1 &&
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
