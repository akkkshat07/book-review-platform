import React, { useState } from 'react';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  Grid,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { booksAPI } from '../services/api';

const AddBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!title.trim() || !author.trim() || !genre.trim()) {
      setError('All fields are required');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await booksAPI.addBook({ title, author, genre });
      navigate(`/books/${response.data._id}`);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to add book');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="md">
      <Paper elevation={3} sx={{ padding: 4, mt: 4 }}>
        <Typography component="h1" variant="h4" align="center" gutterBottom>
          Add New Book
        </Typography>
        
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="title"
                label="Book Title"
                name="title"
                autoFocus
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                inputProps={{ maxLength: 200 }}
                helperText={`${title.length}/200 characters`}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="author"
                label="Author"
                name="author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                inputProps={{ maxLength: 100 }}
                helperText={`${author.length}/100 characters`}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="genre"
                label="Genre"
                name="genre"
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                inputProps={{ maxLength: 50 }}
                helperText={`${genre.length}/50 characters`}
                placeholder="e.g., Fiction, Mystery, Science Fiction"
              />
            </Grid>
          </Grid>
          
          <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
            <Button
              type="submit"
              variant="contained"
              disabled={loading}
              sx={{ flex: 1 }}
            >
              {loading ? 'Adding Book...' : 'Add Book'}
            </Button>
            
            <Button
              variant="outlined"
              onClick={() => navigate('/books')}
              sx={{ flex: 1 }}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default AddBook;
