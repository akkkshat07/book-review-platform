import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Container } from '@mui/material';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import BookList from './pages/BookList';
import BookDetail from './pages/BookDetail';
import AddBook from './pages/AddBook';
import { useAuth } from './contexts/AuthContext';

function App() {
  const { token } = useAuth();

  return (
    <div className="App">
      <Navbar />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Routes>
          <Route path="/login" element={!token ? <Login /> : <Navigate to="/books" />} />
          <Route path="/signup" element={!token ? <Signup /> : <Navigate to="/books" />} />
          <Route path="/books" element={<BookList />} />
          <Route path="/books/:id" element={<BookDetail />} />
          <Route path="/add-book" element={token ? <AddBook /> : <Navigate to="/login" />} />
          <Route path="/" element={<Navigate to="/books" />} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
