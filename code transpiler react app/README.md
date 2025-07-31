# **Frontend – Python to C Transpiler React App**

This is the frontend interface for the Python-to-C transpiler tool. It provides a browser-based environment where users can input Python code, submit it for analysis and transpilation, and receive the equivalent C code along with intermediate outputs like tokens and symbol tables.

## Features

- **Live Code Editor** powered by Monaco
- **Transpiles Python to C** using the backend API
- Shows:
  - Lexical analysis results
  - Token classification
  - Syntax validation output
  - Symbol table
  - Final transpiled C code
- Displays error messages for invalid code

## Tech Stack

- **React.js** with **TypeScript**
- **Material UI** – for styling and layout
- **Monaco Editor** – for code editing
- **Axios** – for communicating with backend API
- **Vite** – build tool

## Live App

[Python to C Transpiler (Hosted)](https://sanidhya-dobhal.github.io/Python-to-C-transpiler/)

## Scripts

```bash
npm install        # Install dependencies
npm run dev        # Start development server
npm run build      # Build for production
npm run preview    # Preview the built app locally
npm run lint       # Lint the code
npm run deploy     # Deploy to GitHub Pages
```
---
## Development Notes
* Make sure the backend (`code-transpiler-backend`) is running locally on port `5000`
* The frontend uses Axios to send code to `/api/transpile` endpoint
* Adjust API base URL in code if backend is hosted elsewhere
---
## Directory Overview
```arduino
code_transpiler_react_app/
├── public/
├── src/
│   ├── App.tsx
│   ├── main.tsx
│   └── components/
├── index.html
├── package.json
├── tsconfig.app.json
├── vite.config.ts
└── ...
```
---
## Before Pushing
* Test the UI thoroughly
* Validate error handling for various edge cases
* Ensure consistency with backend responses
---
