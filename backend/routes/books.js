const express = require('express');
const { body, validationResult } = require('express-validator');
const Book = require('../models/Book');
const Review = require('../models/Review');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    
    const { genre, author, sort } = req.query;
    
    let filter = {};
    if (genre) filter.genre = { $regex: genre, $options: 'i' };
    if (author) filter.author = { $regex: author, $options: 'i' };
    
    let sortOption = { createdAt: -1 };
    if (sort === 'rating') sortOption = { averageRating: -1 };
    if (sort === 'title') sortOption = { title: 1 };
    
    const books = await Book.find(filter)
      .populate('addedBy', 'username')
      .sort(sortOption)
      .skip(skip)
      .limit(limit);
    
    const total = await Book.countDocuments(filter);
    
    res.json({
      books,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/genres', async (req, res) => {
  try {
    const genres = await Book.distinct('genre');
    res.json(genres);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/authors', async (req, res) => {
  try {
    const authors = await Book.distinct('author');
    res.json(authors);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id)
      .populate('addedBy', 'username');
    
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/', auth, [
  body('title').notEmpty().trim().escape(),
  body('author').notEmpty().trim().escape(),
  body('genre').notEmpty().trim().escape()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, author, genre } = req.body;

    const existingBook = await Book.findOne({ title, author });
    if (existingBook) {
      return res.status(400).json({ message: 'Book already exists' });
    }

    const book = new Book({
      title,
      author,
      genre,
      addedBy: req.user._id
    });

    await book.save();
    await book.populate('addedBy', 'username');
    
    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
