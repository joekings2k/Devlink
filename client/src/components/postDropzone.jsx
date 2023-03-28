import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import CloseIcon from "@mui/icons-material/Close";
import { Box, IconButton } from "@mui/material";
import { useTheme } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

export const PostDropzone = ({setImage, imagee}) => {
  const theme = useTheme();
 

  const { palette } = theme;

  const [files, setFiles] = useState([]);
  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles?.length) {
      
      setImage(acceptedFiles[0]);
      
      setFiles((previousFiles) => [
        ...previousFiles,
        ...acceptedFiles.map((file) =>
          Object.assign(file, { preview: URL.createObjectURL(file) })
        ),
      ]);
    }
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
  });

  // const removePic = (name) => {
  //   setFiles(files.filter((file) => file.name !== name));
  // }; functionality to delete items

  // const picture = imagee.map((imgg)=>(

  // ))

  
  const isImageeEmpty = imagee===null

  return (
    <Box
      height="3rem"
      {...getRootProps()}
      border={`2px dashed ${palette.primary.main}`}
      style={{ display: "flex", justifyContent: "center" }}
      width ="100%"
    >
      <EditOutlinedIcon />
      <input {...getInputProps()} type="file" name="picture" />
      {isImageeEmpty ? (
        <>
          {isDragActive ? (
            <p>Drop the file here ...</p>
          ) : (
            <p>Drag 'n' drop some files here, or click to select files</p>
          )}
        </>
      ) : (
        <img   src={imagee?.preview} alt ={imagee?.name}/>
      )}
    </Box>
  );
};
