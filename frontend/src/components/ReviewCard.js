import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Avatar,
} from '@mui/material';
import StarRating from './StarRating';

const ReviewCard = ({ review }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar sx={{ mr: 2, bgcolor: 'primary.main' }}>
            {review.reviewer?.username?.[0]?.toUpperCase()}
          </Avatar>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle1" fontWeight="bold">
              {review.reviewer?.username}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {formatDate(review.createdAt)}
            </Typography>
          </Box>
          <StarRating value={review.rating} readOnly size="small" />
        </Box>
        
        <Typography variant="body1" sx={{ mt: 1 }}>
          {review.reviewText}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ReviewCard;
