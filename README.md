# Python to C code convertor tool
This tool validates the python source code and if the code has no errors, it it converted to C
## Features
- Identifies if a variable is used but never declared. 

## Logics
- ### Numeric assignments
    - Numeric assignments are the ones with alternating variables or numerical literals and arithematic operators in the RHS. 
    - Additionally the last token should not be arithematic operator