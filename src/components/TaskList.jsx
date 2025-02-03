import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  Box,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(
          "https://task-management-system-backend-orcin.vercel.app/api/tasks",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  const handleDelete = async () => {
    if (!selectedTask) return;

    try {
      await axios.delete(
        `http://localhost:8888/api/tasks/${selectedTask._id}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      setTasks(tasks.filter((task) => task._id !== selectedTask._id));
      setOpenDialog(false);
    } catch (error) {
      console.error("Error deleting task:", error);
      alert("Failed to delete task.");
    }
  };

  return (
    <Container maxWidth="md" sx={{ marginTop: 4 }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h4" fontWeight="bold" color="#01204E">
          Tasks
        </Typography>
        <Button
          variant="contained"
          component={Link}
          to="/tasks/new"
          startIcon={<AddIcon />}
          sx={{
            backgroundColor: "#01204E",
            color: "#fff",
            "&:hover": { backgroundColor: "#01356B" },
          }}
        >
          Create Task
        </Button>
      </Box>

      <Box display="flex" flexDirection="column" gap={2}>
        {tasks.map((task) => (
          <Card
            key={task._id}
            sx={{ backgroundColor: "#f5f5f5", borderRadius: 2, padding: 2 }}
          >
            <CardContent>
              <Typography variant="h6" fontWeight="bold">
                {task.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" mb={2}>
                {task.description}
              </Typography>
              <Typography variant="body2" color="text.secondary" mb={2}>
              Status :  {task.status}
              </Typography>
              <Typography variant="body2" color="text.secondary" mb={2}>
                Assined To : {task.assignedTo.username}
              </Typography>
              <Box display="flex" justifyContent="flex-end" gap={1}>
                <IconButton
                  component={Link}
                  to={`/tasks/edit/${task._id}`}
                  sx={{ color: "#1976d2" }}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  sx={{ color: "#d32f2f" }}
                  onClick={() => {
                    setSelectedTask(task);
                    setOpenDialog(true);
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this task? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default TaskList;
