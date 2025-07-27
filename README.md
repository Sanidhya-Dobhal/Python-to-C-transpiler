# Python to C code convertor tool
This tool validates the python source code and if the code has no errors, it it converted to C

🧩 **This repository is a monorepo** containing both frontend and backend code,  along with some test cases for validation and reliability.
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

## 🧪 Test Cases
This monorepo includes some test cases covering valid and invalid Python code snippets to ensure accurate and safe transpilation.

Why test cases matter:
- 🧷 Reliability: Users can refer to these tests to analyse which scenarios are supported.

- 🧪 Consistency: **Contributors should run the test cases locally and on the hosted version** before pushing any changes to ensure they don't unintentionally break existing features.

- 🧰 Extensibility: The test cases serve as a useful base for anyone looking to extend the transpiler or enhance its accuracy.

📌 Test scripts and sample inputs are organized in the ```Test cases/```
Please refer to the contributing section for how to use them during development.

##  🧮 Logics
- ### Numeric assignments
    - Numeric assignments are the ones with alternating variables or numerical literals and arithematic operators in the RHS. 
    - Additionally the last token should not be arithematic operator

- ### String assignments 
    - Simple string assignments with enclosed in double quotes("") or single quotes('') are supported. 
    - The ```syntaxGrammerChecker``` strictly checks if a line of code (LOC) contains exactly 5 tokens and adheres to one of the following forms:
    <pre> <code>identifier = "string"</code> </pre>
    OR
    <pre><code?>identifier = 'string'</code> </pre> </code></pre>
    <details><summary>Why are string assignments limited to these formats only ?</summary>
    This transpiler is intentionally designed for simple transpilations. In C, string manipulation—such as concatenation—requires using functions like strcat() from the string.h library. Implementing full support for all string assignment variations (e.g., dynamic concatenation) would significantly increase complexity. Hence, for now, only basic assignments are allowed to maintain reliability and clarity during transpilation.

</details>
</details>

## 📦Technologies used 

 - __For frontend:__ <u>React.js with TypeScript</u>, Material UI component library, Monaco Code Editor

- __For backend:__ Node.js and express.js

## 🤝 Contributing & Discussions
I welcome contributions to improve this project! 🚀
Feel free to:

- 🛠️ Work on open issues — just leave a comment or open a pull request.

- 💬 Propose a new issue or enhancement — Please let me know before opening a new issue as there are many features that I do not currently intend to implement. 

- 🧪 Run test cases before submitting changes — this helps ensure no breaking changes are introduced

- 📬 Reach out directly if you want to discuss a feature, a bug, or just talk about compiler design or transpilers in general.

Whether you're a beginner or an experienced developer, your input is appreciated 🥂!
