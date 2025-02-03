import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Container,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Typography,
  Box,
} from "@mui/material";

const TaskForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  // const statusList = ["To Do", "In Progress", "Pending", "Completed"];

  useEffect(() => {
    axios
      .get(
        "https://task-management-system-backend-orcin.vercel.app/api/auth/users"
      )
      .then((res) => setUsers(res.data))
      .catch((err) => console.error("Error fetching users:", err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || !assignedTo ) {
      alert("Please fill out all fields before submitting.");
      return;
    }

    try {
      console.log(status);
      await axios.post(
        "https://task-management-system-backend-orcin.vercel.app/api/tasks",
        { title, description, assignedTo },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      navigate("/tasks");
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{ mt: 4, p: 3, bgcolor: "#f9f9f9", borderRadius: 2 }}
    >
      <Typography variant="h5" fontWeight="bold" color="#01204E" mb={3}>
        Create New Task
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            label="Title"
            variant="outlined"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <TextField
            label="Description"
            variant="outlined"
            fullWidth
            multiline
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />

          <FormControl fullWidth variant="outlined" required>
            <InputLabel id="assigned-to-label">Assigned To</InputLabel>
            <Select
              labelId="assigned-to-label"
              value={assignedTo}
              onChange={(e) => setAssignedTo(e.target.value)}
              label="Assigned To"
            >
              {users.map((user) => (
                <MenuItem key={user._id} value={user._id}>
                  {user.username}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* <FormControl fullWidth variant="outlined" required>
            <InputLabel id="status-label">Select Status</InputLabel>
            <Select
              labelId="status-label"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              label="Select Status"
            >
              {statusList.map((status, index) => (
                <MenuItem key={index} value={status}>
                  {status}
                </MenuItem>
              ))}
            </Select>
          </FormControl> */}

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              backgroundColor: "#01204E",
              "&:hover": { backgroundColor: "#01356B" },
            }}
          >
            Create Task
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default TaskForm;
