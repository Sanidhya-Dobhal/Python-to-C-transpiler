import { Link } from "@mui/material";

interface LinkPropsType {
  file: string | undefined;
  downloadName?: string;
  anchorText?: string;
}

export default function LinkComponent({
  file,
  downloadName = "file.txt",
  anchorText = "Click to download this compilation related file",
}: LinkPropsType) {
  return (
    file && (
      <>
        <Link href={file} download={downloadName}>
          {anchorText}
        </Link>
        <br></br>
      </>
    )
  );
}
