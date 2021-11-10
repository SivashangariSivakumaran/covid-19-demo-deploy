const express = require('express');
const pcrTestController = require('../controllers/pcrTestController');
const authController = require('./../controllers/authController')

const router = express.Router();

router
  .route('/')
   .get(authController.protect, authController.restrictTo('hospitalAdmin'), pcrTestController.getAllPCRTest_hospital)
  .post(authController.protect, authController.restrictTo('hospitalAdmin'),pcrTestController.createPCRTest)

router
  .route('/confirm')
  .post(authController.protect, authController.restrictTo('hospitalAdmin'), pcrTestController.confirmPCRTest)

router.patch('/:id/changestatus',authController.protect, authController.restrictTo('hospitalAdmin'), pcrTestController.changeStatus)
router.get('/toconfirm',authController.protect, authController.restrictTo('hospitalAdmin'), pcrTestController.getNonConfirm)

router.get('/patient',authController.protect, authController.restrictTo('hospitalAdmin','patient'), pcrTestController.getAllPCRTest_Patient)
  // .route('/:id')
//   .get(patientController.getPatient)
//   .patch(patientController.updatePatient)
//   .delete(patientController.deletePatient)

module.exports = router;