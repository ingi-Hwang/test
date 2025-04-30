import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import {
  Box,
  IconButton,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

const Sale = () => {
  const [files, setFiles] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const onDrop = useCallback((acceptedFiles) => {
    setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
  }, []);

  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    noClick: true,
    noKeyboard: true,
    multiple: true,
  });

  const handleSave = () => {
    alert("저장되었습니다!");
  };

  const handleDelete = (fileName) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file.name !== fileName));
  };

  const handleDeleteAll = () => {
    setFiles([]);
  };

  const handleImageClick = (index) => {
    setSelectedImageIndex(index);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedImageIndex(0);
  };

  const handleNextImage = () => {
    setSelectedImageIndex((prevIndex) => (prevIndex + 1) % files.length);
  };

  const handlePrevImage = () => {
    setSelectedImageIndex(
      (prevIndex) => (prevIndex - 1 + files.length) % files.length
    );
  };

  return (
    <Box sx={{ maxWidth: 800, margin: "0 auto", mt: 4 }}>
      {/* 드래그 앤 드롭 영역 */}
      <Box
        {...getRootProps()}
        sx={{
          border: "2px dashed #aaa",
          borderRadius: 2,
          p: 0,
          textAlign: "center",
          cursor: "pointer",
          position: "relative",
          height: 300,
          transition: "all 0.3s ease-in-out",
          "&:hover .add-photo-icon": {
            opacity: 1,
          },
        }}
      >
        <input {...getInputProps()} />

        {files.length === 0 && (
          <Box
            sx={{
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <Typography variant="body1">이미지를 드래그하거나</Typography>
            <Button onClick={open} startIcon={<AddPhotoAlternateIcon />}>
              파일 선택
            </Button>
          </Box>
        )}

        {files.length > 0 && (
          <Box
            sx={{
              display: "flex",
              overflowX: "auto",
              height: "100%",
              scrollSnapType: "x mandatory",
              scrollBehavior: "smooth",
            }}
          >
            {files.map((file, index) => (
              <Box
                key={index}
                sx={{
                  width: "100%",
                  height: "100%",
                  position: "relative",
                  flexShrink: 0,
                  scrollSnapAlign: "start",
                  overflow: "hidden",
                }}
                onClick={() => handleImageClick(index)} // 이미지 클릭 시 팝업 열기
              >
                <img
                  src={URL.createObjectURL(file)}
                  alt={`preview-${index}`}
                  style={{
                    width: "auto",
                    height: "auto",
                    objectFit: "cover",
                  }}
                />
                <IconButton
                  onClick={() => handleDelete(file.name)}
                  sx={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    bgcolor: "#fff",
                    borderRadius: "50%",
                    zIndex: 1,
                  }}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
            ))}
          </Box>
        )}

        {/* + 버튼 */}
        {files.length > 0 && (
          <IconButton
            onClick={open}
            sx={{
              position: "absolute",
              bottom: 10,
              left: "50%",
              transform: "translateX(-50%)",
              bgcolor: "#fff",
              borderRadius: "50%",
              padding: "10px",
              opacity: 0,
              transition: "opacity 0.3s ease-in-out",
              zIndex: 2,
            }}
            className="add-photo-icon"
          >
            <AddPhotoAlternateIcon fontSize="large" />
          </IconButton>
        )}
      </Box>

      {/* 저장 버튼 */}
      <Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
        <Button variant="contained" color="primary" onClick={handleSave}>
          저장
        </Button>
      </Box>

      {/* 전체 삭제 버튼 */}
      {files.length > 0 && (
        <Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
          <Button
            variant="outlined"
            color="error"
            startIcon={<DeleteForeverIcon />}
            onClick={handleDeleteAll}
          >
            전체 삭제
          </Button>
        </Box>
      )}

      {/* 이미지 팝업 다이얼로그 */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>이미지 보기</DialogTitle>
        <DialogContent>
          {files.length > 0 && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
              }}
            >
              <IconButton
                onClick={handlePrevImage}
                sx={{
                  position: "absolute",
                  left: 16,
                  top: "50%",
                  transform: "translateY(-50%)",
                  zIndex: 2,
                }}
              >
                <ArrowBackIosIcon />
              </IconButton>

              <img
                src={URL.createObjectURL(files[selectedImageIndex])}
                alt="Selected"
                style={{
                  maxWidth: "100%",
                  maxHeight: "80vh", // 이미지가 너무 크지 않게 크기 제한
                  objectFit: "contain",
                }}
              />

              <IconButton
                onClick={handleNextImage}
                sx={{
                  position: "absolute",
                  right: 16,
                  top: "50%",
                  transform: "translateY(-50%)",
                  zIndex: 2,
                }}
              >
                <ArrowForwardIosIcon />
              </IconButton>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            닫기
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Sale;
