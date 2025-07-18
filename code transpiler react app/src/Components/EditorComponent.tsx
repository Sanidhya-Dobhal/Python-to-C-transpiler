import RawEditor from "@monaco-editor/react";
export default function EditorComponent({
  editorValue,
  setEditorValue,
  selectedLanguage
}: {
  editorValue: string;
  setEditorValue: React.Dispatch<React.SetStateAction<string>>;
  selectedLanguage: "C"|"python"
}) {
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
    <div style={{ border: "2px solid #7f7f7f", minHeight: 300, width: "76vw" }}>
      <Editor
        height="78vh"
        language = {selectedLanguage.toLowerCase()}
        value={editorValue}
        onChange={editorChangeHandler}
        options={{ fontSize: 18 ,
          readOnly: selectedLanguage.toLowerCase()==='c'?true:false
        }}
      />
    </div>
  );
}
