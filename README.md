# Python to C code convertor tool
This tool validates the python source code and if the code has no errors, it it converted to C

🧩 **This repository is a monorepo** containing both frontend and backend code for the application.
## 🚀 Live Demo
[Python to C Transpiler](https://sanidhya-dobhal.github.io/Python-to-C-transpiler/)
## ✨ Features supported
### 🔁 Transpilation Capabilities
- ✅ Converts simple string assignments (e.g., `name = "John"`)
- ✅ Translates numeric assignments and arithmetic operations (e.g., `a = 5 + 2`)
- ✅ Supports `print()` statements with multiple arguments (e.g., `print("Sum is", result)`)
### 🧠 Syntactic Validation
- ✅ Validates syntax correctness for supported Python statements before transpilation
- ✅ Detects use of variables before they are assigned
- ✅ Identifies unterminated string literals
- ✅ Flags unterminated multi-line comments, preventing malformed translations
- ❌ Does not currently support control flow constructs (e.g., `if`, `while`, `for`) – planned for future


##  🧮 Logics
- ### Numeric assignments
    - Numeric assignments are the ones with alternating variables or numerical literals and arithematic operators in the RHS. 
    - Additionally the last token should not be arithematic operator
## 📦Technologies used 

 - __For frontend:__ <u>React.js with TypeScript</u>, Material UI component library, Monaco Code Editor

- __For backend:__ Node.js and express.js

## 🤝 Contributing & Discussions
I welcome contributions to improve this project! 🚀
Feel free to:

- 🛠️ Work on open issues — just leave a comment or open a pull request.

- 💬 Propose a new issue or enhancement — Please let me know before opening a new issue as there are many features that I do not currently intend to implement. 

- 📬 Reach out directly if you want to discuss a feature, a bug, or just talk about compiler design or transpilers in general.

Whether you're a beginner or an experienced developer, your input is appreciated!

