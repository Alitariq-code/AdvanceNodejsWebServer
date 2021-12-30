const mongoose = require('mongoose');
const slugify = require('slugify');

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: [true, 'name required.'],
    trim: true,
    maxlength: [40, 'name can have only 40 characters'],
    minlength: [5, 'add more characters'],
  },
  slug: String,
  duration: {
    type: Number,
    required: [true, 'duration is required'],
  },
  maxGroupSize: {
    type: Number,
    required: [true, 'a tour must have a group size'],
  },
  difficulty: {
    type: String,
    required: [true, 'a tour should have difficulty'],
  },

  ratingsAverage: {
    type: Number,
    default: 4.5,
    min: [1, 'shoudl have 1'],
    max: [5, 'shoudl below to 5'],
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
  },

  price: {
    type: Number,
    unique: true,
    required: [true, 'price required.'],
  },
  ratings: {
    type: Number,
    default: 4.5,
  },
  priceDiscount: Number,
  summary: {
    type: String,
    trim: true,
    required: [true, 'summary is required'],
  },
  description: {
    type: String,
    trim: true,
  },
  imageCover: {
    type: String,
    required: [true, 'image is required'],
  },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
  startDates: [Date],
});

tourSchema.pre('save', function (next) {
  // eslint-disable-next-line no-empty

  if (this.description) {
    this.slug = slugify(this.name, {
      lower: true,
    });
    next();
  }
});
const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
