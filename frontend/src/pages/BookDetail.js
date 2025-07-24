import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Paper,
  Box,
  Chip,
  Divider,
  Alert,
  CircularProgress,
  Grid,
  Pagination,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import StarRating from '../components/StarRating';
import ReviewCard from '../components/ReviewCard';
import ReviewForm from '../components/ReviewForm';
import { booksAPI, reviewsAPI } from '../services/api';

const BookDetail = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reviewsLoading, setReviewsLoading] = useState(false);
  const [error, setError] = useState('');
  const [reviewPage, setReviewPage] = useState(1);
  const [totalReviewPages, setTotalReviewPages] = useState(1);

  const fetchBook = async () => {
    try {
      const response = await booksAPI.getBook(id);
      setBook(response.data);
    } catch (error) {
      setError('Failed to fetch book details');
    } finally {
      setLoading(false);
    }
  };

  const fetchReviews = async (page = 1) => {
    setReviewsLoading(true);
    try {
      const response = await reviewsAPI.getReviews(id, { page, limit: 5 });
      setReviews(response.data.reviews);
      setTotalReviewPages(response.data.totalPages);
    } catch (error) {
      console.error('Failed to fetch reviews:', error);
    } finally {
      setReviewsLoading(false);
    }
  };

  useEffect(() => {
    fetchBook();
    fetchReviews();
  }, [id]);

  const handleReviewAdded = (newReview) => {
    setReviews(prev => [newReview, ...prev]);
    fetchBook();
  };

  const handleReviewPageChange = (event, value) => {
    setReviewPage(value);
    fetchReviews(value);
  };

  if (loading) {
    return (
      <Container>
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (error || !book) {
    return (
      <Container>
        <Alert severity="error">{error || 'Book not found'}</Alert>
      </Container>
    );
  }

  return (
    <Container>
      <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          {book.title}
        </Typography>
        
        <Typography variant="h5" color="text.secondary" gutterBottom>
          by {book.author}
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
          <Chip label={book.genre} color="primary" />
          <StarRating value={book.averageRating} readOnly />
          <Typography variant="body2" color="text.secondary">
            ({book.totalReviews} review{book.totalReviews !== 1 ? 's' : ''})
          </Typography>
        </Box>
        
        <Typography variant="body1" color="text.secondary">
          Added by {book.addedBy?.username} on{' '}
          {new Date(book.createdAt).toLocaleDateString()}
        </Typography>
      </Paper>

      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Typography variant="h5" gutterBottom>
            Reviews
          </Typography>
          
          {reviewsLoading ? (
            <Box display="flex" justifyContent="center" mt={2}>
              <CircularProgress />
            </Box>
          ) : reviews.length === 0 ? (
            <Alert severity="info">No reviews yet. Be the first to review this book!</Alert>
          ) : (
            <>
              {reviews.map((review) => (
                <ReviewCard key={review._id} review={review} />
              ))}
              
              {totalReviewPages > 1 && (
                <Box display="flex" justifyContent="center" mt={3}>
                  <Pagination
                    count={totalReviewPages}
                    page={reviewPage}
                    onChange={handleReviewPageChange}
                    color="primary"
                  />
                </Box>
              )}
            </>
          )}
        </Grid>
        
        <Grid item xs={12} md={4}>
          <ReviewForm bookId={id} onReviewAdded={handleReviewAdded} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default BookDetail;
