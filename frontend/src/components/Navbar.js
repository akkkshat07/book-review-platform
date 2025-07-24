import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Divider,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { 
  MenuBook, 
  Person, 
  Add, 
  Logout, 
  AccountCircle 
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleLogout = () => {
    logout();
    navigate('/books');
    setAnchorEl(null);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar 
      position="static" 
      elevation={0}
      sx={{ 
        background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
      }}
    >
      <Toolbar sx={{ px: { xs: 2, sm: 3 } }}>
        <MenuBook sx={{ mr: 2, fontSize: 28 }} />
        <Typography 
          variant="h6" 
          component="div" 
          sx={{ 
            flexGrow: 1,
            fontWeight: 700,
            background: 'linear-gradient(45deg, #ffffff, #e2e8f0)',
            backgroundClip: 'text',
            textFillColor: 'transparent',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          <Link 
            to="/books" 
            style={{ 
              color: 'inherit', 
              textDecoration: 'none',
              background: 'inherit',
              backgroundClip: 'inherit',
              textFillColor: 'inherit',
              WebkitBackgroundClip: 'inherit',
              WebkitTextFillColor: 'inherit',
            }}
          >
            BookReviews
          </Link>
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Button 
            color="inherit" 
            component={Link} 
            to="/books"
            startIcon={<MenuBook />}
            sx={{ 
              borderRadius: 2,
              px: 2,
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              }
            }}
          >
            Browse Books
          </Button>
          
          {isAuthenticated ? (
            <>
              <Button 
                color="inherit" 
                component={Link} 
                to="/add-book"
                startIcon={<Add />}
                variant="outlined"
                sx={{ 
                  borderColor: 'rgba(255, 255, 255, 0.3)',
                  borderRadius: 2,
                  px: 2,
                  '&:hover': {
                    borderColor: 'rgba(255, 255, 255, 0.5)',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  }
                }}
              >
                Add Book
              </Button>
              
              <IconButton
                onClick={handleMenuOpen}
                sx={{ 
                  ml: 1,
                  p: 0.5,
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  }
                }}
              >
                <Avatar 
                  sx={{ 
                    width: 36, 
                    height: 36,
                    bgcolor: 'secondary.main',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                  }}
                >
                  {user?.username?.[0]?.toUpperCase()}
                </Avatar>
              </IconButton>
              
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                PaperProps={{
                  sx: {
                    mt: 1,
                    borderRadius: 2,
                    minWidth: 200,
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
                  }
                }}
              >
                <Box sx={{ px: 2, py: 1.5, borderBottom: '1px solid #e2e8f0' }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Signed in as
                  </Typography>
                  <Typography variant="body2" fontWeight={600}>
                    {user?.username}
                  </Typography>
                </Box>
                <MenuItem 
                  onClick={handleLogout}
                  sx={{ 
                    py: 1.5,
                    color: 'error.main',
                    '&:hover': {
                      backgroundColor: 'error.50',
                    }
                  }}
                >
                  <Logout sx={{ mr: 2, fontSize: 20 }} />
                  Sign Out
                </MenuItem>
              </Menu>
            </>
          ) : (
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button 
                color="inherit" 
                component={Link} 
                to="/login"
                startIcon={<Person />}
                sx={{ 
                  borderRadius: 2,
                  px: 2,
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  }
                }}
              >
                Sign In
              </Button>
              <Button 
                component={Link} 
                to="/signup"
                variant="contained"
                color="secondary"
                sx={{ 
                  borderRadius: 2,
                  px: 3,
                  boxShadow: '0 4px 12px rgba(245, 158, 11, 0.4)',
                  '&:hover': {
                    boxShadow: '0 6px 20px rgba(245, 158, 11, 0.6)',
                  }
                }}
              >
                Sign Up
              </Button>
            </Box>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
