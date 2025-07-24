const express = require('express');
const { body, validationResult } = require('express-validator');
const Review = require('../models/Review');
const Book = require('../models/Book');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/book/:bookId', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const reviews = await Review.find({ book: req.params.bookId })
      .populate('reviewer', 'username')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Review.countDocuments({ book: req.params.bookId });

    res.json({
      reviews,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/', auth, [
  body('reviewText').notEmpty().trim().isLength({ max: 1000 }),
  body('rating').isInt({ min: 1, max: 5 }),
  body('bookId').isMongoId()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { reviewText, rating, bookId } = req.body;

    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    const existingReview = await Review.findOne({
      book: bookId,
      reviewer: req.user._id
    });

    if (existingReview) {
      return res.status(400).json({ message: 'You have already reviewed this book' });
    }

    const review = new Review({
      reviewText,
      rating,
      book: bookId,
      reviewer: req.user._id
    });

    await review.save();

    const allReviews = await Review.find({ book: bookId });
    const averageRating = allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length;

    await Book.findByIdAndUpdate(bookId, {
      averageRating: Math.round(averageRating * 10) / 10,
      totalReviews: allReviews.length
    });

    await review.populate('reviewer', 'username');
    
    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.put('/:id', auth, [
  body('reviewText').notEmpty().trim().isLength({ max: 1000 }),
  body('rating').isInt({ min: 1, max: 5 })
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const review = await Review.findById(req.params.id);
    
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    if (review.reviewer.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const { reviewText, rating } = req.body;
    
    review.reviewText = reviewText;
    review.rating = rating;
    await review.save();

    const allReviews = await Review.find({ book: review.book });
    const averageRating = allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length;

    await Book.findByIdAndUpdate(review.book, {
      averageRating: Math.round(averageRating * 10) / 10
    });

    await review.populate('reviewer', 'username');
    
    res.json(review);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    if (review.reviewer.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const bookId = review.book;
    await Review.findByIdAndDelete(req.params.id);

    const allReviews = await Review.find({ book: bookId });
    const averageRating = allReviews.length > 0 
      ? allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length 
      : 0;

    await Book.findByIdAndUpdate(bookId, {
      averageRating: Math.round(averageRating * 10) / 10,
      totalReviews: allReviews.length
    });

    res.json({ message: 'Review deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
