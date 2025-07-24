import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
} from '@mui/material';
import StarRating from './StarRating';
import { reviewsAPI } from '../services/api';
import { useAuth } from '../contexts/AuthContext';

const ReviewForm = ({ bookId, onReviewAdded }) => {
  const { isAuthenticated } = useAuth();
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!reviewText.trim() || rating === 0) {
      setError('Please provide both review text and rating');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await reviewsAPI.addReview({
        reviewText,
        rating,
        bookId
      });
      
      setReviewText('');
      setRating(0);
      if (onReviewAdded) {
        onReviewAdded(response.data);
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to add review');
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Write a Review
          </Typography>
          <Alert severity="info">
            Please log in to write a review
          </Alert>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Write a Review
        </Typography>
        
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <Box sx={{ mb: 2 }}>
            <Typography component="legend" gutterBottom>
              Rating
            </Typography>
            <StarRating
              value={rating}
              onChange={setRating}
            />
          </Box>
          
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Your Review"
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            variant="outlined"
            sx={{ mb: 2 }}
            inputProps={{ maxLength: 1000 }}
            helperText={`${reviewText.length}/1000 characters`}
          />
          
          <Button
            type="submit"
            variant="contained"
            disabled={loading || !reviewText.trim() || rating === 0}
            fullWidth
          >
            {loading ? 'Submitting...' : 'Submit Review'}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ReviewForm;
