import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  TextField,
  Button,
  Box,
  Typography,
  Snackbar,
  Alert,
  Link,
} from "@mui/material";
import { motion } from "framer-motion";
import { css } from "@emotion/react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false); 
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(  
        "http://localhost:8888/api/auth/login",
        {
          email,
          password,
        }
      );

      localStorage.setItem("token", response.data.token);
      navigate("/tasks");
    } catch (error) {
      console.error("Login failed:", error);
      setSnackbarMessage("Email or password invalid");
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f4f6f9",
        padding: "20px",
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        css={css`
          background-color: white;
          padding: 40px;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          width: 100%;
          max-width: 400px;
        `}
      >
        <Typography
          variant="h4"
          align="center"
          sx={{ marginBottom: "20px", fontWeight: "bold" }}
        >
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            variant="outlined"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ marginBottom: "15px" }}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            variant="outlined"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ marginBottom: "20px" }}
          />
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{
                padding: "12px",
                fontSize: "16px",
                borderRadius: "8px",
                backgroundColor: "#01204E",
                "&:hover": { backgroundColor: "#013366" },
              }}
            >
              Login
            </Button>
          </motion.div>
        </form>

        <Typography
          variant="body2"
          align="center"
          sx={{ marginTop: "15px", fontSize: "14px" }}
        >
          Don't have an account?{" "}
          <Link
            href="/signup" 
            underline="hover"
            sx={{ color: "#01204E", fontWeight: "bold" }}
          >
            Create an Account
          </Link>
        </Typography>
      </motion.div>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="error"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Login;
