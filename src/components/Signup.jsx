import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  TextField,
  Button,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import { motion } from "framer-motion";
import { css } from "@emotion/react";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "https://task-management-system-backend-orcin.vercel.app/api/auth/register",
        {
          username,
          email,
          password,
        }
      );

      navigate("/");
    } catch (error) {
      setSnackbarMessage("User Already Exist");
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
          Create Account
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Username"
            type="text"
            fullWidth
            variant="outlined"
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            sx={{ marginBottom: "15px" }}
          />
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
              Signup
            </Button>
          </motion.div>
        </form>
        <Typography
          variant="body2"
          align="center"
          sx={{ marginTop: "15px", fontSize: "14px" }}
        >
          Already have an account?{" "}
          <Button
            variant="text"
            onClick={() => navigate("/")}
            sx={{ color: "#01204E", fontWeight: "bold" }}
          >
            Login
          </Button>
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

export default Signup;
