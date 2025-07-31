# **Test Cases – Python to C Transpiler**

###### This directory contains Python code samples used to verify the correctness, reliability, and limitations of the transpilation process from Python to C.
---
## Purpose

- Ensure supported syntax is correctly transpiled
- Detect unsupported features and raise appropriate errors
- Enable regression testing for contributors
- Provide reusable examples for development and debugging
---
## Folder Structure
```
est cases/
├── DegreeToFarenheit.py # Valid: arithmetic + print
├── stringAssignments.py # Valid: single & double quote strings
├── Swapping_2_variables.py # Valid: variable reassignment
├── testCaseInput1.py # Mixed types, repeated logic
├── testCaseInput2.py # Edge case: empty print
└── Error cases/
```
---

## Usage Instructions

1. Start the **backend** (`npm start`) and **frontend** (`npm run dev`)
2. Copy the contents of any test case into the frontend editor
3. Check the output:
   - **Tokens**, **symbol table**, and **final C code** should display for valid files
   - **Errors** should be shown for unsupported/invalid cases
---
## Sample Test Categories

### Valid Tests
- Simple numeric assignments
- String assignments with `'` or `"`
- Basic arithmetic expressions
- Standard print statements

### Invalid / Edge Case Ideas
- Unterminated strings or comments
- Variables used before assignment
- Unsupported syntax (`if`, `for`, `while`, etc.)
---
## Contributing New Tests

- Add new `.py` files for test cases
- Use descriptive file names
- Keep each test small and focused on one concept
- For invalid cases, place them under `Error cases/` for clarity

---

