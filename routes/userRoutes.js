const express =require('express');

const userController = require('./../controllers/userController')
const authController = require('./../controllers/authController')
const router= express.Router()

// router.get('/',authController.protect, userController.getAllUsers)
router.post('/signup', authController.protect, authController.restrictTo('hospitalAdmin','admin'),authController.signup)
router.post('/login',authController.login)
router.post('/forgotpassword',authController.forgotPassword)
router.patch('/resetpassword/:token',authController.resetPassword)
router.patch('/update',authController.protect,userController.updateUserInformation)
router.patch('/updatepassword',authController.protect,authController.updatePassword)
module.exports = router;

router
  .route('/')
  .get( userController.getAllUsers)
  .post(userController.createUser)

module.exports = router;
