const { Schema, model } = require('mongoose');

const ratingSchema = new Schema({
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  comment: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 100,
  },
});

module.exports = model('Rating', ratingSchema);
