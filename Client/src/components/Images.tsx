import { Grid, Box, Button, Alert } from "@mui/material";
import axios from "axios";

import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";

const fileTypes = ["JPG", "PNG", "GIF"];

const Images = () => {
  const [file, setFile] = useState<any[]>([]);
  // const [uploadFile, setUploadFile] = useState<any[]>([]);
  const [displayFiles, setDisplayFiles] = useState<any[]>([]);
  const [alert, setAlert] = useState(false);

  // console.log("file", file);
  // console.log("uploadFile", uploadFile);

  const handleChange = (files: any) => {
    if (files && files.length) {
      const fileUpload = files;
      // setUploadFile([...fileUpload]);
      setFile([...fileUpload, ...file]);
    }
  };
  // console.log("uploadFile", uploadFile);
  console.log("file", file);

  
  const handleUploadFile = async () => {
    const formdata = new FormData();

    const headers: any = {
      "Content-Type": "form-data",
    };

    for (let i = 0; i < file.length; i++) {
      formdata.append("filesList", file[i]);
    }
    console.log("formData", formdata);

    const result = await axios.post(
      "http://localhost:5000/upload",
      formdata,
      headers
    );
    console.log("res==>", result);
    setDisplayFiles(result.data.msg);
    setAlert(true);
    setTimeout(function () {
      setAlert(false);
    }, 5000);
  };
  console.log("displayFiles=====>", displayFiles);

  const FilData = displayFiles?.map((item) => item.originalname + " , ");
  console.log("FilData====>", FilData);
  const labelData = FilData.toString();
  console.log("labelData===>", labelData);


  return (
    <Grid container direction="row">
      <Grid item xs={3}></Grid>
      <Grid item xs={6}>
        <Box
          sx={{
            display: "flex",
            width: "400px",
            height: "auto",
            position: "sticky",
            mt: "70px",
            flex: "wrap",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box>
            <FileUploader
              label={labelData}
              handleChange={(e: any) => handleChange(e)}
              name="file"
              types={fileTypes}
              multiple={true}
              // hoverTitle={labelData}
            />
            <Button
              variant="contained"
              color="info"
              fullWidth
              onClick={handleUploadFile}
              sx={{
                mt: "20px",
                fontFamily: "monospace",
                fontWeight: "600",
                backgroundColor: "#0093E9",
                backgroundImage:
                  "linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)",
              }}
            >
              Upload
            </Button>
            {displayFiles?.map((item: any, index: any) => {
              return (
                <>
                  <li
                    key={index}
                    style={{
                      lineHeight: "35px",
                      color: "darkblue",
                      fontFamily: "monospace",
                      fontWeight: "600",
                    }}
                  >
                    {JSON.stringify(item.filename)}
                  </li>
                </>
              );
            })}
            {alert && (
              <Alert
                severity="success"
                sx={{
                  fontFamily: "monospace",
                  fontWeight: "600",
                }}
              >
                {FilData}
              </Alert>
            )}
          </Box>
        </Box>
      </Grid>
      <Grid item xs={3}></Grid>
    </Grid>
  );
};

export default Images;
