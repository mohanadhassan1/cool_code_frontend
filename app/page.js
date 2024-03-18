"use client";

import React, { useState } from "react";
import {
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Container,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
} from "@mui/material";
import { Add, Edit, Delete, Done } from "@mui/icons-material";
import axios from "axios";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editTaskIndex, setEditTaskIndex] = useState(null);

  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    date: new Date(),
    category: "",
    userId: "",
  });

  const [editedTask, setEditedTask] = useState({
    title: "",
    description: "",
    date: new Date(),
    category: "",
    userId: "",
  });

  const [filterCategory, setFilterCategory] = useState("");

  const handleAddTask = async (e) => {

    e.preventDefault();
    newTask.userId = localStorage.getItem("userId");
    console.log("Task submitted:", newTask);

    setTasks([...tasks, newTask]);
    setNewTask({
        title: "",
        description: "",
        date: new Date(),
        category: "",
        userId: localStorage.getItem("userId"),
      });
    setOpenAddDialog(false);

    try {
      const res = await axios.post(
        "https://cool-code-backend.onrender.com/task",
        newTask
      );
      console.log(res.data);
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  const handleEditTask = (index) => {
    setEditTaskIndex(index);
    setEditedTask(tasks[index]);
    setOpenEditDialog(true);
  };

  const handleUpdateTask = () => {
    if (editTaskIndex !== null) {
      const updatedTasks = [...tasks];
      updatedTasks[editTaskIndex] = editedTask;
      setTasks(updatedTasks);
      setOpenEditDialog(false);
    }
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const handleCompleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index] = {
      ...updatedTasks[index],
      completed: !updatedTasks[index].completed,
    };
    setTasks(updatedTasks);
  };

  const handleFilterChange = (event) => {
    setFilterCategory(event.target.value);
  };

  const filteredTasks = filterCategory
    ? tasks.filter((task) => task.category === filterCategory)
    : tasks;

  return (
    <>
      <Container component="main" maxWidth="md">
        <Box>
          <Typography variant="h4" align="center" gutterBottom>
            Tasks
          </Typography>

          <Button
            sx={{ marginTop: 2 }}
            variant="contained"
            startIcon={<Add />}
            onClick={() => setOpenAddDialog(true)}
          >
            Add New Task
          </Button>

          <FormControl sx={{ width: 200, margin: 2 }}>
            <InputLabel id="filter-category-label">
              Filter by Category
            </InputLabel>
            <Select
              label="Filter by Category"
              labelId="filter-category-label"
              id="filter-category"
              value={filterCategory}
              onChange={handleFilterChange}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="work">Work</MenuItem>
              <MenuItem value="personal">Personal</MenuItem>
              <MenuItem value="shopping">Shopping</MenuItem>
            </Select>
          </FormControl>

          <List>
            {filteredTasks.map((task, index) => (
              <ListItem
                key={index}
                sx={task.completed ? { textDecoration: "line-through" } : {}}
              >
                <ListItemText
                  primary={task.title}
                  secondary={`Description: ${
                    task.description
                  }, Date: ${task.date.toLocaleDateString()}, Category: ${
                    task.category
                  }`}
                />

                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    aria-label="complete"
                    onClick={() => handleCompleteTask(index)}
                  >
                    <Done />
                  </IconButton>

                  <IconButton
                    edge="end"
                    aria-label="edit"
                    onClick={() => handleEditTask(index)}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleDeleteTask(index)}
                  >
                    <Delete />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>

          {/* Add Task Dialog */}
          <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)}>
            <DialogTitle>Add Task</DialogTitle>
            <DialogContent>
              <TextField
                label="Title"
                fullWidth
                value={newTask.title}
                onChange={(e) =>
                  setNewTask({ ...newTask, title: e.target.value })
                }
                sx={{ marginTop: 2 }}
              />
              <TextField
                label="Description"
                fullWidth
                value={newTask.description}
                onChange={(e) =>
                  setNewTask({ ...newTask, description: e.target.value })
                }
                sx={{ marginTop: 2 }}
              />
              <TextField
                label="Date"
                type="date"
                fullWidth
                value={
                  newTask.date ? newTask.date.toISOString().split("T")[0] : ""
                }
                onChange={(e) =>
                  setNewTask({ ...newTask, date: new Date(e.target.value) })
                }
                sx={{ marginTop: 2 }}
              />
              <FormControl fullWidth sx={{ marginTop: 2 }}>
                <InputLabel id="category-label">Category</InputLabel>
                <Select
                  label="Category"
                  labelId="category-label"
                  // id="category"
                  value={newTask.category}
                  onChange={(e) =>
                    setNewTask({ ...newTask, category: e.target.value })
                  }
                >
                  <MenuItem value="">Select Category</MenuItem>
                  <MenuItem value="work">Work</MenuItem>
                  <MenuItem value="personal">Personal</MenuItem>
                  <MenuItem value="shopping">Shopping</MenuItem>
                </Select>
              </FormControl>
            </DialogContent>

            <DialogActions>
              <Button onClick={() => setOpenAddDialog(false)}>Cancel</Button>
              <Button onClick={handleAddTask}>Add</Button>
            </DialogActions>
          </Dialog>

          {/* Edit Task Dialog */}
          <Dialog
            open={openEditDialog}
            onClose={() => setOpenEditDialog(false)}
          >
            <DialogTitle>Edit Task</DialogTitle>
            <DialogContent>
              <TextField
                label="Title"
                fullWidth
                value={editedTask.title}
                onChange={(e) =>
                  setEditedTask({ ...editedTask, title: e.target.value })
                }
                sx={{ marginTop: 2 }}
              />
              <TextField
                label="Description"
                fullWidth
                value={editedTask.description}
                onChange={(e) =>
                  setEditedTask({ ...editedTask, description: e.target.value })
                }
                sx={{ marginTop: 2 }}
              />
              <TextField
                label="Date"
                type="date"
                fullWidth
                value={
                  editedTask.date
                    ? editedTask.date.toISOString().split("T")[0]
                    : ""
                }
                onChange={(e) =>
                  setEditedTask({
                    ...editedTask,
                    date: new Date(e.target.value),
                  })
                }
                sx={{ marginTop: 2 }}
              />

              <FormControl fullWidth sx={{ marginTop: 2 }}>
                <InputLabel id="category-label">Category</InputLabel>
                <Select
                  label="Category"
                  labelId="category-label"
                  // id="category"
                  value={editedTask.category}
                  onChange={(e) =>
                    setEditedTask({ ...editedTask, category: e.target.value })
                  }
                >
                  <MenuItem value="">Select Category</MenuItem>
                  <MenuItem value="work">Work</MenuItem>
                  <MenuItem value="personal">Personal</MenuItem>
                  <MenuItem value="shopping">Shopping</MenuItem>
                </Select>
              </FormControl>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenEditDialog(false)}>Cancel</Button>
              <Button onClick={handleUpdateTask}>Update</Button>
            </DialogActions>
          </Dialog>
        </Box>
      </Container>
    </>
  );
}
