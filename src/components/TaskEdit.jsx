import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {
  TextField,
  MenuItem,
  Button,
  CircularProgress,
  Box,
  Typography,
  Card,
  CardContent,
} from "@mui/material";
import { motion } from "framer-motion";

const TaskEdit = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [status, setStatus] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const statusList = ["To Do", "In Progress", "Pending", "On Hold"];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const userRes = await axios.get(
          "https://task-management-system-backend-orcin.vercel.app/api/auth/users"
        );
        setUsers(userRes.data);

        const taskRes = await axios.get(
          `https://task-management-system-backend-orcin.vercel.app/api/tasks/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        setTitle(taskRes.data.title);
        setDescription(taskRes.data.description);
        setAssignedTo(taskRes.data.assignedTo._id);
        setStatus(taskRes.data.status);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || !assignedTo || !status) {
      alert("Please fill out all fields before submitting.");
      return;
    }

    setLoading(true);
    try {
      await axios.put(
        `https://task-management-system-backend-orcin.vercel.app/api/tasks/${id}`,
        { title, description, assignedTo, status },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      navigate("/tasks");
    } catch (error) {
      console.error("Error updating task:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <Card sx={{ width: 400, p: 3, boxShadow: 3 }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Edit Task
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                margin="normal"
                required
              />
              <TextField
                select
                fullWidth
                label="Assign To"
                value={assignedTo}
                onChange={(e) => setAssignedTo(e.target.value)}
                margin="normal"
                required
              >
                {users.map((user) => (
                  <MenuItem key={user._id} value={user._id}>
                    {user.username}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                select
                fullWidth
                label="Status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                margin="normal"
                required
              >
                {statusList.map((s, index) => (
                  <MenuItem key={index} value={s}>
                    {s}
                  </MenuItem>
                ))}
              </TextField>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} /> : "Update Task"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </Box>
    </motion.div>
  );
};

export default TaskEdit;
