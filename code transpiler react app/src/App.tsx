import { useState } from "react";
import EditorComponent from "./Components/EditorComponent";
import axios from "axios";
import './App.css';
import { Button, Tabs, Tab, Box, Accordion, AccordionSummary } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LinkComponent from "./Components/CustomComponents/LinkComponent";
import InfoToolTipComponent from "./Components/InfoToolTipComponent";

function App() {
  const [codeWithoutComm, setcodeWithoutComm] = useState<string>();
  const [lexemesFile, setLexemesFile] = useState<string>();
  const [tokenList, setTokenList] = useState<string>();
  const [simplifiedTokenRep, setSimplifiedTokenListRep] = useState<string>("");
  const [statementValidity, setStatementValidity] = useState<string>("");
  const [finalCCode, setFinalCCode] = useState<string>("");
  const [pythonCode, setPythonCode] = useState<string>("");
  const [finalCCodeString, setFinalCCodeString] = useState<string>("");

  const [selectedLanguageTab, setSelectedLanguageTab] = useState<
    "C" | "python"
  >("python");

  const [error, setError] = useState<string>();
  const transpileCode = async (
    sourceCode: string,
    sourceLang: string,
    targetLang: string
  ) => {
    try {
      const response = await axios.post("https://python-to-c-transpiler-backend.onrender.com/api/transpile", {
        sourceCode,
        sourceLang,
        targetLang,
      });
      if (response.data.error) {
        setError(response.data.error);
      } else {
        const files = response.data.files;
        const blob1 = new Blob([files[0]], { type: "text/plain" });
        const blob2 = new Blob([files[1]], { type: "text/plain" });
        const tokenListBlob = new Blob([files[2]], { type: "text/plain" });
        const simplifiedTokenRepBlob = new Blob([files[3]], {
          type: "text/plain",
        });
        const statementValidityBlob = new Blob([files[4]], {
          type: "text/plain",
        });
        const finalCCodeBlob = new Blob([files[5]], { type: "text/plain" });
        const url = URL.createObjectURL(blob1);
        const url2 = URL.createObjectURL(blob2);
        const tokenListUrl = URL.createObjectURL(tokenListBlob);
        const simplifiedTokenRepUrl = URL.createObjectURL(
          simplifiedTokenRepBlob
        );
        const statementValidityUrl = URL.createObjectURL(statementValidityBlob);
        const finalCCodeUrl = URL.createObjectURL(finalCCodeBlob);
        setcodeWithoutComm(url);
        setLexemesFile(url2);
        setTokenList(tokenListUrl);
        setSimplifiedTokenListRep(simplifiedTokenRepUrl);
        setStatementValidity(statementValidityUrl);
        setFinalCCode(finalCCodeUrl);
        if (selectedLanguageTab === "python") setPythonCode(editorValue);
        setSelectedLanguageTab("C");
        setEditorValue(files[5]);
        setFinalCCodeString(files[5]);
      }
      // return response.data.transpiledCode;
    } catch (error) {
      if (error instanceof Error) setError(error.message); //Remove in prod maybe
      return null;
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
    <h1 style = {{marginTop:32, marginBottom: 8}}>Python to C Transpiler</h1>
    <div style={{ display: "flex", flexDirection: "row" }}>
      <div>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
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
      <div style = {{display:finalCCode?'block':'none',marginRight: 32, marginLeft:32}}>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <b style = {{color: 'rgb(0, 82, 165)'}}>Supporting files</b>
            <InfoToolTipComponent  title= "Intermediate output files generated during transpilation to help better understand and debug each compilation phase" placement= "top" />
            </AccordionSummary>
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
        </Accordion>
        </div>
        {error && (
          <div>
            <p style={{ color: "red", margin: "0" , textAlign:"center"}} >{error}</p>
          </div>
        )}
      </div>
    </div>
    </>
  );
}

export default App;
