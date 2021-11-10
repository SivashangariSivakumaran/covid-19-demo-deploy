const express = require('express');
const adminController = require('../controllers/adminController');
const authController = require('./../controllers/authController')

const router = express.Router();

router
  .route('/')
  .get(authController.protect, authController.restrictTo('patient'), adminController.getAllUsers)
  .post(adminController.createUser)

// router
//   .route('/:id')
//   .get(adminController.getPatient)
//   .patch(adminController.updatePatient)
//   .delete(adminController.deletePatient)

module.exports = router;

