import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Chip,
  Box,
  Button,
  Avatar,
  Stack,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { 
  Star, 
  Person, 
  MenuBook,
  RateReview 
} from '@mui/icons-material';
import StarRating from './StarRating';

const BookCard = ({ book }) => {
  return (
    <Card 
      sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 4,
          background: 'linear-gradient(90deg, #2563eb, #f59e0b)',
        }
      }}
    >
      <CardContent sx={{ flexGrow: 1, pt: 3 }}>
        <Box sx={{ mb: 2 }}>
          <Typography 
            gutterBottom 
            variant="h6" 
            component="h2" 
            sx={{ 
              fontWeight: 600,
              lineHeight: 1.3,
              minHeight: '3.2em',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              mb: 1
            }}
          >
            {book.title}
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Person sx={{ fontSize: 16, color: 'text.secondary', mr: 0.5 }} />
            <Typography 
              variant="body2" 
              color="text.secondary"
              sx={{ fontWeight: 500 }}
            >
              {book.author}
            </Typography>
          </Box>
        </Box>
        
        <Box sx={{ mb: 2 }}>
          <Chip 
            label={book.genre} 
            size="small" 
            sx={{ 
              bgcolor: 'primary.50',
              color: 'primary.700',
              fontWeight: 500,
              border: '1px solid',
              borderColor: 'primary.200',
            }}
          />
        </Box>
        
        <Box sx={{ mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <StarRating value={book.averageRating} readOnly size="small" />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <RateReview sx={{ fontSize: 16, color: 'text.secondary' }} />
            <Typography variant="body2" color="text.secondary">
              {book.totalReviews} review{book.totalReviews !== 1 ? 's' : ''}
            </Typography>
          </Box>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar 
            sx={{ 
              width: 24, 
              height: 24, 
              fontSize: '0.75rem',
              bgcolor: 'secondary.main',
              mr: 1
            }}
          >
            {book.addedBy?.username?.[0]?.toUpperCase()}
          </Avatar>
          <Typography variant="body2" color="text.secondary">
            Added by {book.addedBy?.username}
          </Typography>
        </Box>
      </CardContent>
      
      <Box sx={{ p: 2, pt: 0 }}>
        <Button 
          component={Link} 
          to={`/books/${book._id}`}
          variant="contained" 
          fullWidth
          size="medium"
          startIcon={<MenuBook />}
          sx={{
            borderRadius: 2,
            py: 1.2,
            fontWeight: 500,
            background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
            '&:hover': {
              background: 'linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%)',
              transform: 'translateY(-1px)',
              boxShadow: '0 8px 25px rgba(37, 99, 235, 0.4)',
            },
            transition: 'all 0.2s ease-in-out',
          }}
        >
          View Details
        </Button>
      </Box>
    </Card>
  );
};

export default BookCard;
