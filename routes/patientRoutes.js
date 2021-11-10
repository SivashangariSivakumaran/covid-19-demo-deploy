const express = require('express');
const patientController = require('../controllers/patientController');
const authController = require('./../controllers/authController')
const medicalHistoryController = require('../controllers/medicalHistoryController');

const router = express.Router();

router
  .route('/')
  .get(authController.protect, authController.restrictTo('patient','admin', 'hospitalAdmin'), patientController.getAllPatients)
  .get(patientController.getAllPatients)
  // .post(patientController.createPatient)
  

router
  .route('/:id')
  .get(patientController.getPatient)
  .patch(patientController.updatePatient)
//   .delete(patientController.deletePatient)


router.post('/:id/history', authController.protect, authController.restrictTo('hospitalAdmin'), medicalHistoryController.createMedical)
router.get('/:id/admit', authController.protect, authController.restrictTo('hospitalAdmin'), medicalHistoryController.createMedical)
router.get('/:patientID/discharge', authController.protect, authController.restrictTo('hospitalAdmin'), medicalHistoryController.discharge)
router.get('/search/:nic', authController.protect, authController.restrictTo('hospitalAdmin'), patientController.getPatientByNIC)
router.get('/hospital/admitted', authController.protect, authController.restrictTo('hospitalAdmin'),  patientController.getAdmittedPatients)
module.exports = router;