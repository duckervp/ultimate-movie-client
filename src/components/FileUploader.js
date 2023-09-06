import { Box, Button, TextField } from "@mui/material";
import * as React from 'react';
import Loading from "./Loading";
import FileUploadIcon from '@mui/icons-material/FileUpload';
import PublishIcon from '@mui/icons-material/Publish';
import { useUploadFileMutation } from "../features/admin/slice/streamApiSlice";
import { showErrorMessage, showSuccessMessage } from "../utils";

const FileUploader = (props) => {

  const [file, setFile] = React.useState();

  const { label, displayImage, url, setUrl, loader } = props;

  const [tempUrl, setTempUrl] = React.useState(url);

  const [displayUploadBtn, setDisplayUploadBtn] = React.useState(false);

  const [uploadFile, { isLoading }] = useUploadFileMutation();

  const handleTextInputChange = (event) => {
    setUrl(event.target.value);
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setFile(file);
        setDisplayUploadBtn(true);
        if (displayImage) {
          setTempUrl(reader.result);
        }
      };

      reader.readAsDataURL(file);
    }
  }

  const handleUploadFile = async () => {
    try {
      const data = await uploadFile(file).unwrap();
      setUrl(data.result.url);
      showSuccessMessage("File uploaded successfully!");
      setDisplayUploadBtn(false);
    } catch (error) {
      showErrorMessage(error, "File upload failed!");
    }
  }

  if (isLoading) {
    return <Loading type={loader} />
  }

  return (
    <Box sx={{ mt: 1, mb: 2 }}>
      <Box sx={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
          <Box sx={{ display: "flex" }}>
            <label htmlFor={`htmlId-for${label}`}>
              <input
                id={`htmlId-for${label}`}
                name={`htmlId-for${label}`}
                style={{ display: 'none' }}
                type="file"
                onChange={handleFileChange} />
              <Button
                startIcon={<FileUploadIcon />}
                variant="outlined"
                component="span"
                sx={{ py: 2, px: 3 }}>
                {label}
              </Button>
            </label>
            {
              !displayImage && displayUploadBtn && <Button
                onClick={handleUploadFile}
                variant="contained"
                component="span" sx={{ ml: 2 }}
                startIcon={<PublishIcon />}>
                Upload
              </Button>
            }
          </Box>

          <TextField
            InputLabelProps={{ shrink: true }}
            required
            id={`url-for${label}`}
            name="url"
            label={`${label} URL`}
            defaultValue={url}
            multiline
            fullWidth
            sx={{ mt: 2 }}
            onChange={handleTextInputChange}
            autoComplete='off'
          />
        </Box>

        {
          (displayImage && tempUrl) && <Box sx={{ ml: 3, display: "flex", alignItems: "flex-end" }}>
            <img src={tempUrl} alt={label} height={100} />
          </Box>
        }

        {
          displayImage && displayUploadBtn && <Button
            onClick={handleUploadFile}
            variant="contained"
            component="span"
            sx={{ ml: 3, py: 2, px: 3 }}
            startIcon={<PublishIcon />}>
            Upload
          </Button>
        }

      </Box>
    </Box>

  );
}

export default FileUploader;