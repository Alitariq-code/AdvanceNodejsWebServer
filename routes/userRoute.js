const express = require('express');
const userControl = require('../controllers/userControler');

const router = express.Router();
router.route('/').get(userControl.getAllUsers).post(userControl.addUser);
router.route('/:id').get(userControl.getsingleUser).delete(userControl.delUser);

module.exports = router;
