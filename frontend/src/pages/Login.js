import React, { useState } from 'react';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  Link,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { 
  Email, 
  Lock, 
  Visibility, 
  VisibilityOff,
  LoginOutlined 
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import { authAPI } from '../services/api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    console.log('Login attempt:', { email, password: password ? '***' : 'empty' });

    try {
      const response = await authAPI.login(email, password);
      console.log('Login success:', response.data);
      login(response.data.token, response.data.user);
      navigate('/books');
    } catch (error) {
      console.log('Login error:', error);
      console.log('Error response:', error.response);
      setError(error.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          minHeight: '80vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          py: 4,
        }}
      >
        <Paper 
          elevation={0}
          sx={{ 
            padding: { xs: 3, sm: 4 },
            borderRadius: 3,
            border: '1px solid',
            borderColor: 'grey.200',
            background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
          }}
        >
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Box
              sx={{
                width: 64,
                height: 64,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mx: 'auto',
                mb: 2,
              }}
            >
              <LoginOutlined sx={{ fontSize: 32, color: 'white' }} />
            </Box>
            <Typography component="h1" variant="h4" fontWeight={700} color="text.primary">
              Welcome Back
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
              Sign in to your account to continue
            </Typography>
          </Box>
          
          {error && (
            <Alert 
              severity="error" 
              sx={{ 
                mb: 3, 
                borderRadius: 2,
                '& .MuiAlert-message': {
                  fontWeight: 500,
                }
              }}
            >
              {error}
            </Alert>
          )}
          
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email sx={{ color: 'text.secondary' }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                mb: 2,
                '& .MuiOutlinedInput-root': {
                  backgroundColor: 'background.paper',
                }
              }}
            />
            
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock sx={{ color: 'text.secondary' }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                mb: 3,
                '& .MuiOutlinedInput-root': {
                  backgroundColor: 'background.paper',
                }
              }}
            />
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              sx={{
                py: 1.5,
                borderRadius: 2,
                fontSize: '1rem',
                fontWeight: 600,
                background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%)',
                  boxShadow: '0 8px 25px rgba(37, 99, 235, 0.4)',
                },
                '&:disabled': {
                  background: 'grey.300',
                },
                transition: 'all 0.2s ease-in-out',
              }}
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </Button>
            
            <Box textAlign="center" sx={{ mt: 3 }}>
              <Typography variant="body2" color="text.secondary">
                Don't have an account?{' '}
                <Link 
                  component={RouterLink} 
                  to="/signup" 
                  sx={{ 
                    fontWeight: 600,
                    color: 'primary.main',
                    textDecoration: 'none',
                    '&:hover': {
                      textDecoration: 'underline',
                    }
                  }}
                >
                  Sign up here
                </Link>
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Login;
