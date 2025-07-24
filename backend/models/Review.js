const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  reviewText: {
    type: String,
    required: true,
    trim: true,
    maxlength: 1000
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
    required: true
  },
  reviewer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

reviewSchema.index({ book: 1, reviewer: 1 }, { unique: true });
reviewSchema.index({ book: 1, createdAt: -1 });

module.exports = mongoose.model('Review', reviewSchema);
