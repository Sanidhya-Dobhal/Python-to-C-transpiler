import RawEditor from "@monaco-editor/react";
import { useEffect, useState } from "react";
export default function EditorComponent({
  editorValue,
  setEditorValue,
  selectedLanguage
}: {
  editorValue: string;
  setEditorValue: React.Dispatch<React.SetStateAction<string>>;
  selectedLanguage: "C"|"python"
}) {
  const [isMinimapEnabled,setIsMinimapEnabled] = useState(window.innerWidth>600);
  useEffect(()=>{
    window.addEventListener("resize",()=>{
      setIsMinimapEnabled(window.innerWidth>600); 
    })
  },[])
  const Editor = RawEditor as unknown as React.FC<any>;
  function editorChangeHandler(value: string|undefined) {
    if(value){
    setEditorValue(value);
  }
  else{
    setEditorValue("");
  }
  }
  return (
    <div  className = "editor">
      <Editor
        height="78vh"
        language = {selectedLanguage.toLowerCase()}
        value={editorValue}
        onChange={editorChangeHandler}
        options={{ fontSize: 18 ,
          readOnly: selectedLanguage.toLowerCase()==='c'?true:false,
          minimap: {
            enabled: isMinimapEnabled
          }
        }}
      />
    </div>
  );
}
