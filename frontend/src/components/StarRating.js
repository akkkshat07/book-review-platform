import React from 'react';
import { Rating, Box, Typography } from '@mui/material';
import { Star, StarBorder } from '@mui/icons-material';

const StarRating = ({ value, readOnly = false, onChange, size = 'medium' }) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
      <Rating
        value={value}
        onChange={(event, newValue) => onChange && onChange(newValue)}
        readOnly={readOnly}
        precision={0.1}
        size={size}
        icon={
          <Star 
            fontSize="inherit" 
            sx={{ 
              color: '#f59e0b',
              filter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1))',
            }} 
          />
        }
        emptyIcon={
          <StarBorder 
            fontSize="inherit" 
            sx={{ 
              color: '#d1d5db',
              transition: 'color 0.2s ease',
            }} 
          />
        }
        sx={{
          '& .MuiRating-iconFilled': {
            color: '#f59e0b',
          },
          '& .MuiRating-iconHover': {
            color: '#fbbf24',
          },
          '& .MuiRating-iconEmpty': {
            color: '#e5e7eb',
          },
          ...(readOnly && {
            '& .MuiRating-icon': {
              fontSize: size === 'small' ? '1rem' : size === 'large' ? '1.5rem' : '1.2rem',
            }
          }),
        }}
      />
      {readOnly && (
        <Typography 
          variant={size === 'small' ? 'body2' : 'body1'} 
          sx={{ 
            color: 'text.secondary',
            fontWeight: 500,
            fontSize: size === 'small' ? '0.75rem' : '0.875rem',
          }}
        >
          {value ? value.toFixed(1) : '0.0'}
        </Typography>
      )}
    </Box>
  );
};

export default StarRating;
