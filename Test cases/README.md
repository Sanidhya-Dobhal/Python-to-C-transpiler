# 🧪 **Test Cases – Python to C Transpiler**

###### This directory contains Python code samples used to verify the correctness, reliability, and limitations of the transpilation process from Python to C using this tool
---
## 🎯 Purpose

- Ensure supported syntax is correctly transpiled
- Detect unsupported features and syntax errors and raise appropriate errors
- Enable **regression testing** for contributors
- Provide reusable examples for development and debugging

> ⚠️ **Note for contributors:** Before pushing new changes, please ensure the test cases pass by checking their outputs using the [hosted application](https://sanidhya-dobhal.github.io/Python-to-C-transpiler/).
---
##  📁 Folder Structure
```
Test cases/
│
├── Error-triggering cases/       # Contains syntactically incorrect or semantically invalid programs
│   ├── invalidNumericExpression.py
│   ├── undeclaredVariableUsage.py
│   ├── unterminatedComment.py
│   └── unterminatedString.py
│
├── Transpilable cases/          # Contains syntactically correct and valid programs
│   ├── DegreeToFahrenheit.py
│   ├── stringAssignments.py
│   ├── Swapping_2_variables.py
│   ├── testCaseInput1.py
│   └── testCaseInput2.py
```
---

## Usage Instructions

1. Start the application (refer to frontend and backend READMEs for setup)
2. Copy the contents of any test case into the frontend editor
3. Check the output:

   - ✅ Final C code will appear in the output editor if the test case is valid

   - 📄 Supporting files (available for download on the right side of the UI) will include:

      - Code without comments

      - Lexeme list

      - All tokens

      - Token representation of the Python code

      - Statement category file

      - Symbol table

   - ❌ Errors will be shown if the code includes unsupported features or invalid syntax
---
## Sample Test Categories

### Transpilable Test Cases
 These are simple Python programs that the transpiler can successfully convert to C code. They typically test:

- Simple numeric assignments
- String assignments with `'` or `"`
- Basic arithmetic expressions
- Standard print statements with multiple arguments

### Error-triggering Test Cases

These are valid test cases designed to trigger specific errors in the transpiler, such as:

- Unterminated strings or comments
- Variables used before assignment
- Invalid Numeric assignments


---
