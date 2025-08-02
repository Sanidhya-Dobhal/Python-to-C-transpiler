# **Frontend – Python to C Transpiler React App**

This contains the react code for the frontend interface for the Python-to-C transpiler tool. A React-based web interface where users can write Python code, run it through the transpiler, and get equivalent C code with intermediate outputs such as lexical tokens, symbol tables, and syntax validation.

## Features

- ⚡ **Live Code Editor** powered by Monaco
- 🔄 Real-time transpilation of Python code into C via backend API
- 🖥️ Displays:
  - Final C Code in the code editor

  In supporting files section
  - Code with comments removed
  - Lexical analysis results
  - Token List
  - Simplified token representation
  - Syntax validation output
  - Symbol table

- Displays appropriate error 🚫 messages for invalid code

## Tech Stack

- **React.js** with **TypeScript**
- **Material UI** – for styling and layout
- **Monaco Editor** – for code editing
- **Axios** – for API communication with the backend
- **Vite** – build tool

## Live App

[Python to C Transpiler (Hosted)](https://sanidhya-dobhal.github.io/Python-to-C-transpiler/)

## 🚀 Setup

Clone the repository and from the root directory run the following commands:

```bash
cd code\ transpiler\ react\ app/
npm install        # Install frontend dependencies
npm run dev        # Start development server
```

This will launch the React-based frontend for development on http://localhost:5173 (or your Vite-configured port).

---
## Development Notes
- Make sure the backend (`code-transpiler-backend`) is running locally on port `5000` if you have to make backend changes and work. 
- The frontend uses Axios to send code to `/api/transpile` endpoint
- **⚠️ If you're modifying the backend**, you must update the Axios URL in the frontend accordingly.

- "🔁 Specifically, edit the `transpileCode` function in `App.tsx`" to reflect your backend setup — this change is essential for local development and correct integration.

Change the following:

```js
const response = await axios.post("https://python-to-c-transpiler-backend.onrender.com/api/transpile", {...});
```
To
```js 
const response = await axios.post("http://localhost:5000/api/transpile", {...});
```

---
## Directory Overview
```
code transpiler react app/
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
* Validate output for all the [Test cases](../Test%20cases/)
* Ensure consistency with backend responses (if you had made backend changes)
---
