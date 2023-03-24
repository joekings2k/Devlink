import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import CloseIcon from "@mui/icons-material/Close";
import { Box, IconButton } from "@mui/material";
import { useTheme } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

export const Dropzone = (props) => {
  const theme = useTheme();
  const { setFieldValue } = props;

  const { palette } = theme;

  const [files, setFiles] = useState([]);
  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles?.length) {
      setFieldValue("picture", acceptedFiles[0]);
      props.setFile([acceptedFiles[0]]);
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

  const removePic = (name) => {
    setFiles(files.filter((file) => file.name !== name));
  };

  const image = files.map((file) => (
    <li key={file.name} style={{ listStyle: "none" }}>
      <IconButton
        onClick={() => removePic(file.name)}
        sx={{
          position: "relative",
          right: "-90px",
          top: "-40px",
          background: "red",
        }}
      >
        <CloseIcon
          sx={{
            "&:hover": { fontSize: "20px" },
            fontSize: "15px",
            color: palette.primary.light,
          }}
        />
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
    <Box
      {...getRootProps()}
      border={`2px dashed ${palette.primary.main}`}
      style={{ display: "flex", justifyContent: "center" }}
    >
      <EditOutlinedIcon />
      <input {...getInputProps()} type="file" name="picture" />
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
    </Box>
  );
};
