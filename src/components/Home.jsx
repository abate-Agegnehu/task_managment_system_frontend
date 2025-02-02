import React from "react";
import TaskList from "./TaskList";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Container, Box } from "@mui/material";

const Home = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: "#f4f6f8",
      }}
    >
      <Navbar />
      <Container
        sx={{
          flex: 1,
          marginTop: 3,
          marginBottom: 3,
          padding: "0 16px",
        }}
      >
        <TaskList />
      </Container>
      <Footer />
    </Box>
  );
};

export default Home;
