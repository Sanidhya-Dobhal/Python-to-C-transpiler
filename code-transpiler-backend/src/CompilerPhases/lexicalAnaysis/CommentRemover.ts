export function commentRemover(sourceCode: string):string | {
    error: string;
} {
  let output = "";
  let i = 0;
  let inString = false;

  while (i < sourceCode.length) {
    const c = sourceCode[i];

    // Handle string toggling with double quotes
    if (c === '"') {
      inString = !inString;
      output += c;
      i++;
      continue;
    }

    // Handle single-line comment starting with # (outside strings)
    if (!inString) {
      if (c === "#") {
        while (i < sourceCode.length && sourceCode[i] !== "\n") {
          i++;
        }
        // if (sourceCode[i] === "\n") { //Analyze this in order to remove the extra new line character that is appearing after single line comment
        //   i++;
        // }
        // include the newline character
        if (i < sourceCode.length) {
          output += sourceCode[i];
          i++;
        }
        continue;
      }

      // Handle triple single quote (''') multiline comment (outside strings)
      if (c === "'" && !inString) {
        if (sourceCode[i + 1] === "'" && sourceCode[i + 2] === "'") {
          i += 3; // Skip opening '''
          let hasCommentTerminated = false; 
          while (i < sourceCode.length) {
            if (
              sourceCode[i] === "'" &&
              sourceCode[i + 1] === "'" &&
              sourceCode[i + 2] === "'"
            ) {
              hasCommentTerminated = true;
              i += 3; // Skip closing '''
              break;
            }
            i++;
          }
          if(hasCommentTerminated){
            continue;
          }
          else{
            return {error:'SyntaxError: unterminated triple-quoted string detected'}
          }
        } else {
          // it's just a single quote or something else, preserve it
          output += c;
          i++;
          continue;
        }
      }
    }

    // Default case: keep character
    output += c;
    i++;
  }

  return output + "\n";
}
