import { useState } from "react";
import EditorComponent from "./Components/EditorComponent";
import axios from "axios";
import './App.css';
import { Button, Tabs, Tab, Box, Accordion,} from "@mui/material";
import LinkComponent from "./Components/CommonComponents/LinkComponent";
import AccordionSummaryComponent from "./Components/AccordionSummaryComponent";
import LoadingOverlayComponent from "./Components/CommonComponents/LoadingOverlayComponent/LoadingOverlayComponent";

function App() {
  const [codeWithoutComm, setcodeWithoutComm] = useState<string>("");
  const [lexemesFile, setLexemesFile] = useState<string>("");
  const [tokenList, setTokenList] = useState<string>("");
  const [simplifiedTokenRep, setSimplifiedTokenListRep] = useState<string>("");
  const [statementValidity, setStatementValidity] = useState<string>("");
  const [finalCCode, setFinalCCode] = useState<string>("");
  const [pythonCode, setPythonCode] = useState<string>("");
  const [symbolTable, setSymbolTable] = useState<string>("");
  const [finalCCodeString, setFinalCCodeString] = useState<string>("");
  const [isCCodeLoading, setIsCCodeLoading] = useState(false);

  const [selectedLanguageTab, setSelectedLanguageTab] = useState<
    "C" | "python"
  >("python");

  const [error, setError] = useState<string>();
    function createFileURLFromText(fileContent:any,setterFunction:React.Dispatch<React.SetStateAction<string>>){
    let file = new Blob([fileContent],{ type: "text/plain" });
    setterFunction(URL.createObjectURL(file));

  }

  const transpileCode = async (
    sourceCode: string,
    sourceLang: string,
    targetLang: string
  ) => {
    try {
      setIsCCodeLoading(true);
      const response = await axios.post("https://python-to-c-transpiler-backend.onrender.com/api/transpile", {
        sourceCode,
        sourceLang,
        targetLang,
      });
      if (response.data.error) {
        setError(response.data.error); 
      } else {
        const files = response.data;
        createFileURLFromText(files.codeWithoutComments, setcodeWithoutComm);
        createFileURLFromText(files.lexicalOutputString,setLexemesFile);
        createFileURLFromText(files.tokenListOutputString,setTokenList);
        createFileURLFromText(files.simplifiedTokenRepString,setSimplifiedTokenListRep);
        createFileURLFromText(files.statementValidityString,setStatementValidity);
        createFileURLFromText(files.symbolTableString,setSymbolTable);
        createFileURLFromText(files.finalCode,setFinalCCode);
        if (selectedLanguageTab === "python") {
          setPythonCode(editorValue);
        }
        setSelectedLanguageTab("C");
        setEditorValue(files.finalCode);
        setFinalCCodeString(files.finalCode);
      }
    } catch (error) {
      if (error instanceof Error) setError(error.message); //Remove in prod maybe
      return null;
    }
    finally {
       setIsCCodeLoading(false);
    }
  };
  async function onClickSubmit() {
    setError("");
    setcodeWithoutComm("");
    setLexemesFile("");
    setTokenList("");
    setSimplifiedTokenListRep("");
    setStatementValidity("");
    setFinalCCode("");
    if (selectedLanguageTab === "python") {
      await transpileCode(editorValue, "python", "c");
    } else {
      await transpileCode(pythonCode, "python", "c");
    }
  }

  function downloadFinalCode(){
     const link = document.createElement("a");
    link.href = finalCCode;
    link.download = "Equivalent C Code.c";
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  
  function handleLanguageChange(event: any) {
    if (event.target.textContent !== selectedLanguageTab) {
      if (event.target.textContent === "C") {
        if (finalCCode.length) {
          setSelectedLanguageTab(event.target.textContent);
          setEditorValue(finalCCodeString);
          setPythonCode(editorValue);
        } else {
          setError(
            "Error: Please click on transpile in order to convert the code to C"
          );
        }
      } else {
        setSelectedLanguageTab(event.target.textContent);
        setEditorValue(pythonCode);
      }
    }
  }
  const [editorValue, setEditorValue] = useState('print("Hello World")');
  return (<>
     <LoadingOverlayComponent loadingState = {isCCodeLoading} delay ={'1000ms'}/>
    <h1 style = {{marginTop:32, marginBottom: 8}}>Python to C Transpiler</h1>
    <main>
      <div>
        <Box sx={{ borderBottom: 1, borderColor: "divider", width: "fit-content" }}>
          <Tabs
            value={selectedLanguageTab}
            onChange={handleLanguageChange}
            aria-label="basic tabs example"
          >
            <Tab label="python" value="python" />
            <Tab
              label="C"
              value="C"
              style={{ opacity: finalCCodeString ? 1 : 0.5 }}
            />
          </Tabs>
        </Box>

        <EditorComponent
          editorValue={editorValue}
          setEditorValue={setEditorValue}
          selectedLanguage={selectedLanguageTab}
        />
        <div style = {{display:'flex',flexDirection:'row',marginTop:8,gap:8}}>
        <Button variant = "contained"onClick={onClickSubmit}>Transpile</Button>
        {finalCCode && <Button variant="outlined" onClick ={downloadFinalCode}>Download C Code</Button>}
        </div>
      </div>
      <div style ={{width:'100%',marginTop:48}}>
      {finalCCode && <div className ="accordion">
        <Accordion>
          <AccordionSummaryComponent title = "Supporting files" toolTipContent = "Intermediate output files generated during transpilation to help better understand and debug each compilation phase" toolTipPlacement="top"/>
        <LinkComponent
          file={codeWithoutComm}
          downloadName="CodeWithoutComments.py"
          anchorText="Download Code Without Comments"
        />
        <LinkComponent
          file={lexemesFile}
          downloadName="lexemes.txt"
          anchorText="Download lexemes"
        />
        <LinkComponent
          file={tokenList}
          downloadName="tokenList.txt"
          anchorText="Download all tokens list"
        />
        <LinkComponent
          file={simplifiedTokenRep}
          downloadName="tokenRepresentationOfCode.txt"
          anchorText="Download token representation of the python code"
        />
        <LinkComponent
          file={statementValidity}
          downloadName="StatementCategory.txt"
          anchorText="Download statement categories file"
        />
        <LinkComponent
          file={symbolTable}
          downloadName="symbolTable.txt"
          anchorText="Download symbol table"
        />
        </Accordion>
        </div>}
        {error && (
          <div>
            <p style={{ color: "red", margin: "0" , textAlign:"center"}} >{error}</p>
          </div>
        )}
      </div>
    </main>
    </>
  );
}

export default App;