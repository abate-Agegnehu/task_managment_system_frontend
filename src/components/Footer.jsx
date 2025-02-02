import React from "react";
import { Container, Typography, Box } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#2c3e50",
        color: "white",
        padding: "20px 0",
        marginTop: "auto",
        textAlign: "center",
      }}
    >
      <Container>
        <Typography variant="body2">
          &copy; {new Date().getFullYear()} Task Management System. All Rights
          Reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
