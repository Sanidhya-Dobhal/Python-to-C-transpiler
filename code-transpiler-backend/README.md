# **Backend – Python to C Transpiler**

This is the backend service that powers the Python-to-C transpiler tool. It handles lexical analysis, syntax validation, and generates equivalent C code for supported Python statements.

## What It Does

The backend performs a multi-phase compilation process:

1. **Comment Removal** – strips out all comments from Python code
2. **Lexical Analysis** – breaks input into lexemes
3. **Token Classification** – identifies token types (identifier, operator, etc.)
4. **Syntax Grammar Check** – validates supported Python grammar
5. **Symbol Table Construction** – stores variable names and types
6. **Code Generation** – produces equivalent C code for valid input

## API Endpoint

### `POST /api/transpile`

**Payload:**
```json
{
  "sourceCode": "x = 5\nprint(x)",
  "sourceLang": "python",
  "targetLang": "c"
}
```
### Returns:
* Transpiled C code
* Lexical output
* Token list
* Syntax evaluation
* Symbol table
* Error messages (if any)
---
## Technologies used
* Node.js
* Express.js
* TypeScript

### Run Locally
```bash
npm install
npm start      # Runs on http://localhost:5000
```
---
## Directory Structure
```pgsql
code-transpiler-backend/
├── src/
│   ├── CompilerPhases/
│   │   ├── lexicalAnaysis/
│   │   ├── syntaxGrammerChecker.ts
│   │   ├── codeGenerator.ts
│   ├── index.ts
│   └── OutputFilesGenerator.ts
├── package.json
└── tsconfig.json
```
---
## Limitations
* Control structures (`if`, `while`, `for`) are not yet supported
* Focuses on simple numeric and string assignments
* Only supports basic `print()` statements
---
## Developer Notes
* You can test with files from the `Test cases/` folder
* Update logic inside `CompilerPhases/` for grammar or lexeme rules
* If modifying outputs, sync the frontend to reflect those changes
---
