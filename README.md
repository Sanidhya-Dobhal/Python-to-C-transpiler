# 🛠️ Python to C Code Transpilation Tool
This tool validates the python source code and, if the code has no errors, it is converted to an equivalent C code.

🧩 **This repository is a monorepo** which contains the following: 

- [🖥️ Frontend (`code transpiler react app/`)](./code%20transpiler%20react%20app/)  
- [⚙️ Backend (`code-transpiler-backend/`)](./code-transpiler-backend/)

- [🧪 Test Cases (`Test cases/`)](./Test%20cases/)  
## 🚀 Live Demo
[**Python to C Transpiler**](https://sanidhya-dobhal.github.io/Python-to-C-transpiler/)
## ✨ Features supported
### 🔁 Transpilation Capabilities
- ✅ Converts simple string assignments (e.g., `name = "John"`)
- ✅ Supports numeric assignments and arithmetic operations (e.g., `a = 5 + 2`)
- ✅ Supports `print()` statements with multiple arguments (e.g., `print("Sum is", result)`)
### 🧠 Syntactic Validation
- ✅ Validates syntax correctness for supported Python statements before transpilation
- ✅ Detects use of variables before they are assigned
- ✅ Identifies unterminated string literals
- ✅ Flags unterminated multi-line comments, preventing malformed translations
- ❌ Does not currently support control flow constructs (e.g., `if`, `while`, `for`) – planned for future

## 🧪 Test Cases
This monorepo includes some test cases covering valid and invalid Python code snippets to ensure accurate and safe transpilation.

Why test cases matter:
- 🧷 Reliability: Users can refer to these tests to analyse which scenarios are supported.

- 🧪 Consistency: **Contributors should run the test cases locally and on the hosted version** before pushing any changes to ensure they don't unintentionally break existing features.

- 🧰 Extensibility: The test cases serve as a useful base for anyone looking to extend the transpiler or enhance its accuracy.

📌 Test scripts and sample inputs are located in [`Test cases/`](./Test%20cases/).

Please refer to the [Contributing & Discussions](#-contributing--discussions) for how to use them during development.

##  🧮 Transpilation Logics
- ### Numeric assignments
    - Numeric assignments are the ones with alternating variables or numerical literals and arithmetic operators in the RHS. 
    - Additionally the last token should not be arithmetic operator

- ### String assignments 
    - Simple string assignments with enclosed in double quotes("") or single quotes('') are supported. 
    - The ```syntaxGrammerChecker``` strictly checks if a line of code (LOC) contains exactly 5 tokens and adheres to one of the following forms:
    <pre> <code>identifier = "string"</code> </pre>
    OR
    <pre><code>identifier = 'string'</code> </pre> </code></pre>
    <details><summary>Why are string assignments limited to these formats only ?</summary>
    This transpiler is intentionally designed for simple transpilations. In C, string manipulation—such as concatenation—requires using functions like strcat() from the string.h library. Implementing full support for all string assignment variations (e.g., dynamic concatenation) would significantly increase complexity. Hence, for now, only basic assignments are allowed to maintain reliability and clarity during transpilation.

</details>
</details>

## 📦Technologies used 

- **Frontend:** React.js (with TypeScript), Material UI, Monaco Code Editor
- **Backend:** Node.js, Express.js

## 🤝 Contributing & Discussions
I welcome contributions to improve this project! 🚀
Feel free to:

- 🛠️ Work on open issues — just leave a comment or open a pull request.

- 💬 Propose a new issue or enhancement — Please let me know before opening a new issue as there are many features that I do not currently intend to implement. 

- 🧪 Run test cases before submitting changes — this helps ensure no breaking changes are introduced

- 📬 Reach out directly if you want to discuss a feature, a bug, or just talk about compiler design or transpilers in general.

Whether you're a beginner or an experienced developer, your input is appreciated 🥂!
