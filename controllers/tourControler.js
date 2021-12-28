/* eslint-disable no-unused-expressions */
/* eslint-disable node/no-unsupported-features/es-syntax */

const Tour = require('../model/tourModel');

exports.getAlltour = async (req, res) => {
  try {
    const queryObj = { ...req.query };
    const exclutedFields = ['page', 'sort', 'limit', 'field'];
    exclutedFields.forEach((el) => {
      // eslint-disable-next-line no-unused-expressions
      delete queryObj[el];
    });

    // console.log(req.query, queryObj);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    let query = Tour.find(JSON.parse(queryStr));

    // 3 Sortinggggggg
    if (req.query.sort) {
      //Here we are checking multiple values to get sort values
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('-createdAt');
    }
    // -Value:To get values in other direction

    //Get required data
    if (req.query.fields) {
      const fields = req.query.fields.split(',').join(' ');
      query = query.select(fields);
    } else {
      query = query.select('-__v');
    }

    // Pagination
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 100;
    const skip = (page - 1) * limit;
    query = query.skip(page).limit(limit);

    if (req.query.page) {
      const numTours = await Tour.countDocuments();
      if (skip >= numTours) throw new Error('this page doest exict');
    }

    const tours = await query;
    res.status(200).json({
      status: 'sucssesfull',
      data: {
        tours,
      },
    });
  } catch (err) {
    res.status(201).json({
      status: 'unsucssfull',
      maseg: err,
    });
  }
};

exports.addTour = async (req, res) => {
  // eslint-disable-next-line no-empty
  try {
    const newtour = await Tour.create(req.body);
    res.status(200).json({
      status: 'sucssessfull',
      data: {
        tour: newtour,
      },
    });
  } catch (err) {
    res.status(201).json({
      status: 'unsucssesfull',
      err,
    });
  }
};

exports.getsingleTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    res.status(200).json({
      status: 'sucssessfull',
      data: {
        tour,
      },
    });
    // eslint-disable-next-line no-empty
  } catch (err) {
    res.status(201).json({
      status: 'unsucssesfull',
      err,
    });
  }
};

exports.tourUpdate = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: 'sucssesfull',
      tour,
    });
  } catch (err) {
    res.status(201).json({
      status: 'unsucssesfull',
      err,
    });
  }
};

exports.delTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndDelete(req.params.id);
    res.json({
      msg: 'ho gaya meray bhai delete',
      tour,
    });
  } catch (err) {
    res.json({
      masg: 'something wrong',
    });
  }
};
