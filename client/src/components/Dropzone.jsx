
import  { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import CloseIcon from "@mui/icons-material/Close";
import {IconButton} from "@mui/material"
import { useTheme} from "@mui/material"
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

export const Dropzone = () => {

  const theme = useTheme()

  const {palette}= theme

  const [files, setFiles] = useState([]);
  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles?.length) {
      setFiles((previousFiles) => [
        ...previousFiles,
        ...acceptedFiles.map((file) =>
          Object.assign(file, { preview: URL.createObjectURL(file) })
        ),
      ]);
    }
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop,multiple:true });


  const removePic =(name)=>{
    setFiles(files.filter((file)=>(file.name!== name )))
    console.log("helloe world")
  }

  const image = files.map((file) => (
    <li key ={file.name } style={{ listStyle:"none"}}>
      <IconButton onClick={()=>removePic(file.name)} sx={{position:"relative",right :"-90px",top:"-40px" ,background:"red" }} >
        <CloseIcon sx={{ "&:hover": { fontSize: "20px" }, fontSize:"15px" , color:palette.primary.light}} />
      </IconButton>

      <img
        key={file.name}
        src={file.preview}
        alt={file.name}
        style={{ width: "70px", height: "50px" }}
      />
    </li>
  ));
  const isFileEmpty = files.length === 0;

  return (
    <div
      {...getRootProps()}
      style={{ display: "flex", justifyContent: "center" }}
    >
      <EditOutlinedIcon />
      <input {...getInputProps()} />
      {isFileEmpty ? (
        <>
          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <p>Drag 'n' drop some files here, or click to select files</p>
          )}
        </>
      ) : (
        image
      )}
    </div>
  );
};
