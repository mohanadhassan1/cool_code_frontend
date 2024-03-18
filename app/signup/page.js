"use client";

import React, { useState } from "react";
import { Container, TextField, Button, Typography, Box } from "@mui/material";
import axios from "axios";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    linkedinURL: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);


    try {
      const res = await axios.post("https://cool-code-backend.onrender.com/user/signup", formData);
      console.log(res.data);
      localStorage.setItem("userId", res.data._id);
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  return (
    <Container maxWidth="xs">
      <Box>
        <Typography variant="h4" align="center" gutterBottom>
          Sign Up
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            name="username"
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.username}
            onChange={handleChange}
          />
          <TextField
            name="email"
            type="email"
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            name="password"
            type="password"
            label="Password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.password}
            onChange={handleChange}
          />
          <TextField
            name="linkedinURL"
            type="url"
            label="Linked URL"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.linkedinURL}
            onChange={handleChange}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ width: 150, mt: 2 }}
          >
            sign up
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default SignupPage;
