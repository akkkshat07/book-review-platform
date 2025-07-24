# Book Review Platform

Live: [https://book-review-platform-d8m9.vercel.app/](https://book-review-platform-d8m9.vercel.app/)

A modern web app I built for sharing and discovering book reviews. Made with the MERN stack and Material UI.

## What it does
- Signup/login
- Add, edit, delete books
- Write reviews, rate books
- See average ratings
- Filter books by genre, author, rating
- Clean, responsive UI

## How to run it

### 1. Clone the repo
```
git clone https://github.com/akkkshat07/book-review-platform.git
cd book-review-platform
```

### 2. Install dependencies
- Backend:
  ```
  cd backend
  npm install
  ```
- Frontend:
  ```
  cd ../frontend
  npm install
  ```

### 3. Environment variables
- Copy `.env.example` in `backend` to `.env` and fill in your MongoDB Atlas URI, JWT secret, etc.
- In `frontend`, set `REACT_APP_API_URL` in `.env.production` to your backend URL (with `/api` at the end).

### 4. Run locally
- Backend:
  ```
  cd backend
  npm start
  ```
- Frontend:
  ```
  cd ../frontend
  npm start
  ```

### 5. Deploy
- Both frontend and backend are ready for Vercel. Just import the repo in Vercel, set environment variables, and deploy each folder separately.

## Why I made this

Wanted a simple way for people to share book reviews and find new reads. You can sign up, add books, write reviews, and see what others think. The UI is clean and works great on any device. All data is stored securely in MongoDB Atlas. Enjoy reading and sharing!

## Features

### 🔐 Authentication
- User signup and login with JWT authentication
- Protected routes for authenticated users

### 📚 Books Management
- Add new books with title, author, and genre
- View paginated list of all books
- Filter books by genre and author
- Sort books by rating, date added, or title
- Search functionality

### ⭐ Reviews & Ratings
- Write reviews and rate books (1-5 stars)
- View all reviews for each book
- Calculate and display average ratings
- Visual star rating display
- One review per user per book

### 🎨 User Interface
- Modern Material-UI design
- Responsive layout for all devices
- Intuitive navigation and user experience
- Real-time feedback and loading states

## Technology Stack

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **bcryptjs** for password hashing
- **express-validator** for input validation

### Frontend
- **React 18** with functional components and hooks
- **Material-UI (MUI)** for styling and components
- **React Router** for navigation
- **Axios** for API communication
- **Context API** for state management

## Project Structure

```
book_review/
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   ├── Book.js
│   │   └── Review.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── books.js
│   │   └── reviews.js
│   ├── middleware/
│   │   └── auth.js
│   ├── server.js
│   ├── package.json
│   └── vercel.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── contexts/
│   │   ├── services/
│   │   ├── App.js
│   │   └── index.js
│   ├── public/
│   └── package.json
└── README.md
```

## API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login

### Books
- `GET /api/books` - Get all books (with pagination and filters)
- `GET /api/books/:id` - Get book by ID
- `POST /api/books` - Add new book (authenticated)
- `GET /api/books/genres` - Get all genres
- `GET /api/books/authors` - Get all authors

### Reviews
- `GET /api/reviews/book/:bookId` - Get reviews for a book
- `POST /api/reviews` - Add new review (authenticated)
- `PUT /api/reviews/:id` - Update review (authenticated, own review only)
- `DELETE /api/reviews/:id` - Delete review (authenticated, own review only)

## Database Schema

### User
- `username` (String, required, unique)
- `email` (String, required, unique)
- `password` (String, required, hashed)

### Book
- `title` (String, required)
- `author` (String, required)
- `genre` (String, required)
- `addedBy` (ObjectId, ref: User)
- `averageRating` (Number, default: 0)
- `totalReviews` (Number, default: 0)

### Review
- `reviewText` (String, required)
- `rating` (Number, 1-5, required)
- `book` (ObjectId, ref: Book)
- `reviewer` (ObjectId, ref: User)
- Unique constraint: one review per user per book

## Features Implemented

### Core Requirements ✅
- [x] User authentication (signup/login) with JWT
- [x] Add new books
- [x] View paginated list of books
- [x] Filter books by genre and author
- [x] Write reviews and ratings (1-5 stars)
- [x] View all reviews for books
- [x] Calculate average ratings
- [x] Proper model relationships

### Bonus Features ✅
- [x] Material-UI styling
- [x] Visual star rating display
- [x] Sorting by rating, date, title
- [x] Form validations
- [x] Responsive UI design
- [x] Vercel deployment ready

## Architecture Decisions

### Backend
- **Express.js**: Chosen for its simplicity and extensive ecosystem
- **MongoDB**: Document database suitable for flexible book/review data
- **JWT Authentication**: Stateless authentication ideal for API
- **Mongoose**: Provides schema validation and easier MongoDB interaction

### Frontend
- **React with Hooks**: Modern React patterns for better performance
- **Material-UI**: Professional UI components with theming support
- **Context API**: Lightweight state management for authentication
- **Axios**: Promise-based HTTP client with interceptors

### Security
- Password hashing with bcryptjs
- JWT token validation middleware
- Input validation and sanitization
- CORS configuration
- Protected routes

## Known Limitations

1. **File Upload**: No book cover image upload functionality
2. **Real-time Updates**: Reviews don't update in real-time across users
3. **Advanced Search**: No full-text search across book content
4. **Social Features**: No user profiles or social interactions
5. **Caching**: No caching layer for frequently accessed data

## Future Enhancements

- Book cover image uploads
- Advanced search with Elasticsearch
- Real-time notifications
- User profiles and favorite books
- Book recommendations
- Admin panel for content moderation
- Email verification for user accounts
- Social sharing features

## Testing

### Backend Testing
```bash
cd backend
npm test
```

### Frontend Testing
```bash
cd frontend
npm test
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.
