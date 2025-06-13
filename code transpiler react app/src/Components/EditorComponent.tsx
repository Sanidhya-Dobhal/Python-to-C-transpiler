import Editor from "@monaco-editor/react";
export default function EditorComponent({
  editorValue,
  setEditorValue,
  selectedLanguage
}: {
  editorValue: string;
  setEditorValue: React.Dispatch<React.SetStateAction<string>>;
  selectedLanguage: "C"|"python"
}) {
  function editorChangeHandler(value: string) {
    setEditorValue(value);
  }
  return (
    <div style={{ border: "2px solid #7f7f7f", minHeight: 300, width: "80vw" }}>
      <Editor
        height="87vh"
        border
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
