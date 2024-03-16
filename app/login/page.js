'use client';

import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box } from '@mui/material';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
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
          Log In
        </Typography>
        <form onSubmit={handleSubmit}>
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
          <Button type="submit" variant="contained" color="primary" sx={{ width: 150, mt: 2 }}>
            log in
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default LoginPage;
