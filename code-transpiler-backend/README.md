#⚙️ **Backend – Python to C Transpiler**

This backend powers the Python-to-C transpiler tool. It processes user-submitted Python code through a multi-phase compilation pipeline and returns the equivalent C code along with intermediate outputs like tokens and symbol tables, if the input is syntactically valid and supported. If the code contains unsupported syntax or errors, the backend returns appropriate errors.



## What It Does

## 🧩 Compilation Phases

| Phase                  | Description                                                  |
|------------------------|--------------------------------------------------------------|
| Comment Removal        | Strips out all comments from the input source                |
| Lexical Analysis       | Breaks the code into lexemes (minimal units of meaning)      |
| Token Classification   | Categorizes each lexeme (identifier, keyword, operator, etc.)|
| Syntax Grammar Check   | Validates that the code follows supported Python grammar     |
| Symbol Table Generation| Records identifiers, datatypes, and their mappings           |
| Code Generation        | Converts valid Python into equivalent C code                 |

## Limitations
* Control structures (`if`, `while`, `for`) are not yet supported
* Focuses on simple numeric and string assignments
* Only supports basic `print()` statements
---

## API Endpoint

### `POST /api/transpile`

**Request Payload:**
```json
{
  "sourceCode": "x = 5\nprint(x)",
  "sourceLang": "python",
  "targetLang": "c"
}
```

**Response Payload**
```js
res.json({
    codeWithoutComments,
    lexicalOutputString,
    tokenListOutputString,
    simplifiedTokenRepString,
    statementValidityString,
    symbolTableString,
    finalCode: codeGenerationOutput.code,
        })

```
### Returns:
* Lexical output
* Token list
* Syntax evaluation
* Symbol table
* Transpiled C code
* Error messages (if any)
---
## Technologies used
* Node.js
* Express.js
* TypeScript

## 🚀 Local Development Setup
Clone the entire repository and from the root directory run the following commands:
```bash
cd code-transpiler-backend
npm install
npm run dev      # Runs on http://localhost:5000
```

> ⚠️ **Note:** To run the frontend along with this backend, please refer to the setup section in the [code transpiler react app](../code%20transpiler%20react%20app/) <br>
Make sure to change the Axios API endpoint in App.tsx to match the server's URL (http://localhost:5000 by default).
---
## Directory Structure
```pgsql
code-transpiler-backend/
├── src/
│   ├── CompilerPhases/
│   │   ├── lexicalAnalysis/
│   │   ├── syntaxGrammerChecker.ts
│   │   ├── codeGenerator.ts
│   ├── index.ts
│   └── OutputFilesGenerator.ts
├── package.json
└── tsconfig.json
```
---

## Developer Notes
* You can test with files from the [Test cases](../Test%20cases/) folder (highly recommended after making any changes)
* Update core logic inside `CompilerPhases/` for grammar or lexeme rules
* Certain adjustments may also be necessary in `index.ts`, especially if you're changing the structure of the response object
* If modifying outputs, sync the frontend to reflect those changes
---
