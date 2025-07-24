import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Grid,
  TextField,
  MenuItem,
  Box,
  Pagination,
  Alert,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  Paper,
  InputAdornment,
  Chip,
  Stack,
} from '@mui/material';
import { 
  Search, 
  FilterList, 
  Sort,
  MenuBook,
  TrendingUp,
} from '@mui/icons-material';
import BookCard from '../components/BookCard';
import { booksAPI } from '../services/api';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalBooks, setTotalBooks] = useState(0);
  const [genres, setGenres] = useState([]);
  const [authors, setAuthors] = useState([]);
  
  const [filters, setFilters] = useState({
    genre: '',
    author: '',
    sort: 'newest'
  });

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const params = {
        page,
        limit: 12,
        ...(filters.genre && { genre: filters.genre }),
        ...(filters.author && { author: filters.author }),
        ...(filters.sort && { sort: filters.sort === 'newest' ? '' : filters.sort })
      };

      const response = await booksAPI.getBooks(params);
      setBooks(response.data.books);
      setTotalPages(response.data.totalPages);
      setTotalBooks(response.data.total);
    } catch (error) {
      setError('Failed to fetch books');
    } finally {
      setLoading(false);
    }
  };

  const fetchFilters = async () => {
    try {
      const [genresRes, authorsRes] = await Promise.all([
        booksAPI.getGenres(),
        booksAPI.getAuthors()
      ]);
      setGenres(genresRes.data);
      setAuthors(authorsRes.data);
    } catch (error) {
      console.error('Failed to fetch filters:', error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [page, filters]);

  useEffect(() => {
    fetchFilters();
  }, []);

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }));
    setPage(1);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const clearFilters = () => {
    setFilters({ genre: '', author: '', sort: 'newest' });
    setPage(1);
  };

  const hasActiveFilters = filters.genre || filters.author || filters.sort !== 'newest';

  if (error) {
    return (
      <Container>
        <Alert severity="error" sx={{ borderRadius: 2 }}>{error}</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl">
      <Box sx={{ py: 4 }}>
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Typography 
            variant="h3" 
            component="h1" 
            fontWeight={700}
            sx={{
              background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
              backgroundClip: 'text',
              textFillColor: 'transparent',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 2,
            }}
          >
            Discover Amazing Books
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
            Explore our collection of {totalBooks} books with reviews from fellow readers
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1 }}>
            <TrendingUp sx={{ color: 'success.main' }} />
            <Typography variant="body2" color="success.main" fontWeight={500}>
              Growing community of book lovers
            </Typography>
          </Box>
        </Box>

        <Paper 
          elevation={0}
          sx={{ 
            p: 3, 
            mb: 4, 
            borderRadius: 3,
            border: '1px solid',
            borderColor: 'grey.200',
            background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <FilterList sx={{ mr: 1, color: 'primary.main' }} />
            <Typography variant="h6" fontWeight={600}>
              Filter & Sort Books
            </Typography>
          </Box>

          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth>
                <InputLabel>Filter by Genre</InputLabel>
                <Select
                  value={filters.genre}
                  label="Filter by Genre"
                  onChange={(e) => handleFilterChange('genre', e.target.value)}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: 'background.paper',
                    }
                  }}
                >
                  <MenuItem value="">All Genres</MenuItem>
                  {genres.map((genre) => (
                    <MenuItem key={genre} value={genre}>
                      {genre}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth>
                <InputLabel>Filter by Author</InputLabel>
                <Select
                  value={filters.author}
                  label="Filter by Author"
                  onChange={(e) => handleFilterChange('author', e.target.value)}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: 'background.paper',
                    }
                  }}
                >
                  <MenuItem value="">All Authors</MenuItem>
                  {authors.map((author) => (
                    <MenuItem key={author} value={author}>
                      {author}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                select
                fullWidth
                label="Sort by"
                value={filters.sort}
                onChange={(e) => handleFilterChange('sort', e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Sort sx={{ color: 'text.secondary' }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: 'background.paper',
                  }
                }}
              >
                <MenuItem value="newest">Newest First</MenuItem>
                <MenuItem value="rating">Highest Rated</MenuItem>
                <MenuItem value="title">Title A-Z</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Box sx={{ pt: 1 }}>
                {hasActiveFilters && (
                  <Chip
                    label="Clear Filters"
                    onClick={clearFilters}
                    onDelete={clearFilters}
                    color="secondary"
                    variant="outlined"
                    sx={{ 
                      height: 40,
                      fontWeight: 500,
                      '&:hover': {
                        backgroundColor: 'secondary.50',
                      }
                    }}
                  />
                )}
              </Box>
            </Grid>
          </Grid>

          {hasActiveFilters && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Active filters:
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap">
                {filters.genre && (
                  <Chip 
                    label={`Genre: ${filters.genre}`} 
                    size="small" 
                    onDelete={() => handleFilterChange('genre', '')}
                    color="primary"
                    variant="filled"
                  />
                )}
                {filters.author && (
                  <Chip 
                    label={`Author: ${filters.author}`} 
                    size="small" 
                    onDelete={() => handleFilterChange('author', '')}
                    color="primary"
                    variant="filled"
                  />
                )}
                {filters.sort !== 'newest' && (
                  <Chip 
                    label={`Sort: ${filters.sort === 'rating' ? 'Highest Rated' : 'Title A-Z'}`} 
                    size="small" 
                    onDelete={() => handleFilterChange('sort', 'newest')}
                    color="primary"
                    variant="filled"
                  />
                )}
              </Stack>
            </Box>
          )}
        </Paper>

        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
            <Box textAlign="center">
              <CircularProgress size={48} sx={{ mb: 2 }} />
              <Typography variant="body1" color="text.secondary">
                Loading amazing books...
              </Typography>
            </Box>
          </Box>
        ) : books.length === 0 ? (
          <Paper 
            elevation={0}
            sx={{ 
              p: 6, 
              textAlign: 'center',
              borderRadius: 3,
              border: '1px solid',
              borderColor: 'grey.200',
            }}
          >
            <MenuBook sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h5" fontWeight={600} gutterBottom>
              No books found
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              {hasActiveFilters 
                ? 'Try adjusting your filters to find more books.'
                : 'Be the first to add a book to our collection!'
              }
            </Typography>
            {hasActiveFilters && (
              <Chip
                label="Clear All Filters"
                onClick={clearFilters}
                color="primary"
                sx={{ fontWeight: 500 }}
              />
            )}
          </Paper>
        ) : (
          <>
            <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="body1" color="text.secondary">
                Showing {books.length} of {totalBooks} books
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Page {page} of {totalPages}
              </Typography>
            </Box>

            <Grid container spacing={3}>
              {books.map((book) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={book._id}>
                  <BookCard book={book} />
                </Grid>
              ))}
            </Grid>

            {totalPages > 1 && (
              <Box display="flex" justifyContent="center" sx={{ mt: 6 }}>
                <Pagination
                  count={totalPages}
                  page={page}
                  onChange={handlePageChange}
                  color="primary"
                  size="large"
                  showFirstButton
                  showLastButton
                  sx={{
                    '& .MuiPaginationItem-root': {
                      borderRadius: 2,
                      fontWeight: 500,
                    },
                    '& .Mui-selected': {
                      background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                      color: 'white',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%)',
                      },
                    },
                  }}
                />
              </Box>
            )}
          </>
        )}
      </Box>
    </Container>
  );
};

export default BookList;
