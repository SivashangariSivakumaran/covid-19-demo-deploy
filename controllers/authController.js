const {promisify} =require('util')
const User=require('./../models/userModel')
const Admin=require('./../models/adminModel')
const jwt = require('jsonwebtoken')
const catchAsync= require('./../utils/catchAsync');
const AppError = require('../utils/appError');
const sendEmail = require('../utils/email');
const crypto = require('crypto')
 
const Patient=require('./../models/patientModel')

const signToken = id =>{
    console.log('new token ............')
    return jwt.sign({id},process.env.JWT_SECRET,{
        // expiresIn:500
        expiresIn:process.env.JWT_EXPIRES_IN
    })
}
// const createSendToken = (user,statusCode, res)=>{
//     console.log(user)
//     const token = signToken(user._id)
//     console.log(token)
//     res.cookie('jwt',token,{
//         expires:new Date(Date.now()+process.env.JWT_COOKIE_EXPIRES_IN*24*60*60*1000),
//         // secure:true,     //COOKIE WILL SEND ONLY ENCREPTED CONNECTION HTTPS 
//         httpOnly:true        // COKKIES CANT BE MODIFIES BY BROWSER - TO PREVENT CROSS SITE ATTACK
//     })
//     res.status(statusCode).json({
//         status:'success',
//         token,
//         data:{
//             user
//         }
//     })
// }

exports.signup =catchAsync( async (req,res,next)=>{
    // console.log(req.cookie)
        // const newUser=await User.create(req.body)  //if we go this way, any user can change other fields too. ex: type of user
        req.body
        const newUser = await User.create({
            name:{
                firstName:req.body.name.firstName,
                lastName:req.body.name.lastName},
            email:req.body.email,
            birthday:req.body.birthday,
            contactNo:req.body.contactNo,
            address:req.body.address,
            password:req.body.password,
            passwordConfirm:req.body.passwordConfirm,
            role:req.body.role,
            // nic:req.body.nic,
        })
        req.body.user=newUser._id
        // console.log(newUser.role)
        if(newUser.role=='patient'){
            await Patient.create(req.body)
        }else if(newUser.role=='hospitalAdmin'){
            await Admin.create(req.body)
        }
        res.status(201).json({
            status:'success',
            // token,
            data:{
                user:newUser
            }
        })
})

exports.login=catchAsync(async(req, res, next)=>{
    const {email, password}=req.body
    if(!email || !password){
        return next(new AppError('Please provide email and password',400))
    }
    var user=await User.findOne({email:email}).select('+password')

    // const correct = await user.correctPassword(password, user.password);
    if(!user || !(await user.correctPassword(password, user.password))) {
        return next(new AppError('Incorrect email or password',401))
    }
    const token = signToken(user._id)
    if(user.role=="hospitalAdmin"){
        const admin =await Admin.findOne({'user':user._id}).populate({
            path:'hospital',
            populate:{
                path:'wards'
            }
        });
        user={user,admin};
    }else{
        user={user};
    }
    // console.log(token)
    res.cookie('jwt',token,{
        expires:new Date(Date.now()+process.env.JWT_COOKIE_EXPIRES_IN*24*60*60*1000),
        // secure:true,     //COOKIE WILL SEND ONLY ENCREPTED CONNECTION HTTPS 
        httpOnly:true        // COKKIES CANT BE MODIFIES BY BROWSER - TO PREVENT CROSS SITE ATTACK
    })
    res.status(201).json({
        status:'success',
        token,
        data:{
            user
        }
    })
})

exports.protect = catchAsync(async (req,res,next)=>{
    console.log(req.cookies)
    let token
    //1. GETTING TOKEN FROM COOKIE
    if(req.cookies && req.cookies.jwt){
        token=req.cookies.jwt
    }
    //1. GETTING TOKEN FROM BEAR AUTH
    else if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token= req.headers.authorization.split(' ')[1]
    }if(!token){
        return next(new AppError('Not Logged In',401))  //401-unathorized
    }
    //2. VERIFY TOKEN
    console.log(`token - ${token}`)
    const decode = await promisify(jwt.verify)(token, process.env.JWT_SECRET)
    console.error(decode)
    //3 check if user exist
    const fuser=await User.findById(decode.id)
    if(!fuser){
        return next(new AppError('User no longer exist',401))  //401-unathorized
    }
    // 4. check if user chage pwd
    const changed=fuser.changePasswordAfter(decode.iat)
    if(changed){
        return next(new AppError('Recently Password has changed',401))  //401-unathorized
    }
    req.user=fuser
    if(fuser.role.startsWith("hospital")){
        const hospital=req.user.hospital=await Admin.findOne({"user":fuser._id}).select('hospital -_id')
        req.user.hospital=hospital.hospital
    }
    // console.log(req.user)
    next()
})

exports.restrictTo = (...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return next(new AppError('You dont have permission to perform this action',403))
        }
        next()
    }
}
//1. Get user based on posted email
//2. genrate random reset token
//3. send it to the user
exports.forgotPassword=catchAsync(async(req,res,next)=>{
    const user=await User.findOne({email:req.body.email})
    if(!user){
        next(new AppError('There is no user with that email',404))
    }
    const resetToken=user.resetToken()
    await user.save({validateBeforeSave:false});  //save the reset token and other info

    const resetURL = `${req.protocol}://${req.get('localhost:3000')}/resetpassword/${resetToken}`
    const message = `Forgot your password? Submit a PATCH request with your new password and password Confirm to ${resetURL}.\n If you didnt forgot your password please ignore this email..!`
    try{
        await sendEmail({
            email:user.email,
            subject:'Forgot Password Request-Covid19 Tracker',
            text:message
        })
        res.status(200).json({
            status:'success',
            message:'Token has been sent to your mail'
        })
    }catch(err){
        user.passwordResetToken =undefined
        user.passwordResetExpire =undefined
        await user.save({validateBeforeSave:false})
        return next(new AppError('There was an error in sending mail. Try again later!'),500)
    }
})

// 1. get user based on the token
// 2. check whether th e token is expired or not
// 3. update change password 
// 4  log the user, send JWT
exports.resetPassword= catchAsync(async (req,res,next)=>{
    const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex')
    const user = await User.findOne({passwordResetToken:hashedToken, passwordResetExpire:{$gt:Date.now()}})
    if(!user){
        return(new AppError('Password reset token is invalid or expired.'))
    }
    user.password=req.body.password
    user.passwordConfirm=req.body.passwordConfirm
    user.passwordResetToken=undefined
    user.passwordResetExpire=undefined
    await user.save()
    const token=signToken(user._id)
    res.cookie('jwt',token,{
        expires:new Date(Date.now()+process.env.JWT_COOKIE_EXPIRES_IN*24*60*60*1000),
        // secure:true,     //COOKIE WILL SEND ONLY ENCREPTED CONNECTION HTTPS 
        httpOnly:true        // COKKIES CANT BE MODIFIES BY BROWSER - TO PREVENT CROSS SITE ATTACK
    })
    res.status(200).json({
        status:'success',
        token
    })
})

//get user from collection, check whether the correct passwoer is corect, update password, send new token

exports.updatePassword= catchAsync(async (req,res,next)=>{
    const user = await User.findById(req.user.id).select('+password');
    if(!(await user.correctPassword(req.body.passwordCurrent, user.password))){
        return next(new AppError('Your current password is wrong', 401))
    }
    user.password=req.body.password;
    user.passwordConfirm=req.body.passwordConfirm;
    await user.save();
    const token = signToken(user._id)
    res.cookie('jwt',token,{
        expires:new Date(Date.now()+process.env.JWT_COOKIE_EXPIRES_IN*24*60*60*1000),
        // secure:true,     //COOKIE WILL SEND ONLY ENCREPTED CONNECTION HTTPS 
        httpOnly:true        // COKKIES CANT BE MODIFIES BY BROWSER - TO PREVENT CROSS SITE ATTACK
    })
    res.status(200).json({
        status:'success',
        token,
        data:{
            user
        }
    })
})