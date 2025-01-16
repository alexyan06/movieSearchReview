import express from 'express';
import Review from '../models/Review.js';

const router = express.Router();

// Get all reviews for a specific movie
router.get('/movie/:movieId', async (req, res) => {
  try {
    const reviews = await Review.find({ movieId: req.params.movieId })
      .sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new review
router.post('/', async (req, res) => {
  const review = new Review({
    movieId: req.body.movieId,
    movieTitle: req.body.movieTitle,
    userRating: req.body.userRating,
    comment: req.body.comment
  });

  try {
    const newReview = await review.save();
    res.status(201).json(newReview);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
