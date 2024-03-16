'use client';

import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box } from '@mui/material';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    linkedin: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add logic to submit form data to backend or perform validation
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
            name="linkedin"
            type="url"
            label="Linked URL"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.linkedin}
            onChange={handleChange}
          />
          <Button type="submit" variant="contained" color="primary" sx={{ width: 150, mt: 2 }}>
            sign up
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default SignupPage;
