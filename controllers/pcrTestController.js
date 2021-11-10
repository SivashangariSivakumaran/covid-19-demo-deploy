const PCRTest=require('./../models/pcrTestModel')
const dashBoard=require('./../models/dashBoardModel')
const HospitalRecord=require('../models/hospitalRecords')

const APIfunctions=require('./../utils/apiFunctions')
const msg = require('../utils/message')
const catchAsync= require('./../utils/catchAsync');
const AppError = require('../utils/appError');
const sendMessage = require('../utils/message');
const dashBoardController = require('./dashBoardController')

const Patient=require('./../models/patientModel')
const DashBoard=require('./../models/dashBoardModel')

// exports.getAllTest = async (req, res) => {
//     //console.log(req.body)
//     try{
//         const features=new APIfunctions(PCRTest.find(),req.query).filter().sort().select()
//         // const tests=await features.query
//         // res.status(200).json({
//         // status: 'success',
//         // requestedAt: req.requestTime,
//         // results: tests.length,
//         // data: {tests}
//         const pcr=await features.query
//         res.status(200).json({
//         status: 'success',
//         requestedAt: req.requestTime,
//         results: pcr.length,
//         data: {pcr}
        
//     });
//     }catch(err){                 //if schema doesnt stisfy error may occur VALIDATION ERROR
//         res.status(404).json({
//             status:'fail',
//             message:err
//         })
//     }
// };

exports.getAllPCRTest_hospital = catchAsync(async (req, res, next) => {
    const hospital=req.user.hospital
    const tests=await PCRTest.find({'hospital':req.user.hospital})
    if(!tests){
        return next(new AppError("No PCR Tests found with that ID",404)) 
    }
    res.status(200).json({
    status: 'success',
    data: {tests}
    });
})

// exports.getAllPCRTest_Patient = catchAsync(async (req, res, next) => {
//     let patientID;
//     if(req.params.id){
//         patientID=req.params.id
//     }else{
//         patientID=await Patient.findOne({user:req.user._id}).select('user');
//     }
//     if(patientID==null){
//         return next(new AppError("patientID cant be null",404))
//     }
//     const tests=await Patient.find({user:req.user._id}).select('pcrTest').populate({path:'pcrTest',populate:{path:'hospital'}})
//     console.log(tests)
//     if(!tests){
//         return next(new AppError("No PCR Tests found with that ID",404)) 
//     }
//     res.status(200).json({
//     status: 'success',
//     data: {tests}
//     });
// })

exports.getAllPCRTest_Patient = catchAsync(async (req, res, next) => {
  var tests = await Patient.aggregate([
    {
      $match: {
        user: req.user._id,
      },
    },
    {
      $project: {
        pcrTest: 1,
      },
    },
    {
      $unwind: {
        path: "$pcrTest",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: "pcrtests",
        localField: "pcrTest",
        foreignField: "_id",
        as: "pcr",
      },
    },
    {
      $unwind: {
        path: "$pcr",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $project: {
        name: "$pcr.name",
        result: "$pcr.result",
        hospital: "$pcr.hospital",
        status: "$pcr.status",
        date:"$pcr.createdAt"
      },
    },
    {
      $lookup: {
        from: "hospitals",
        localField: "hospital",
        foreignField: "_id",
        as: "hospitalD",
      },
    },
    {
      $project: {
        name: 1,
        result: 1,
        hospital: "$hospitalD.name",
        status: 1,
        date:1
      },
    },
    {
      $unwind: {
        path: "$hospital",
        preserveNullAndEmptyArrays: true,
      },
    },
  ]);
  if (!tests) {
    return next(new AppError("No PCR Tests found with that ID", 404));
  }
  res.status(200).json({
    status: "success",
    data: { tests },
  });
});

exports.createPCRTest= catchAsync(async (req,res,next)=>{
  console.log(req.body)
    const d = new Date()
    const today=`${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`.toString()
    req.body.createdBy=req.user.id
    req.body.hospital=req.user.hospital
    req.body.sendStatus="fail"
    const message=`Your PCR Text Result is ${req.body.result}`
    if(req.body.contactNumber){
        const msg=await sendMessage(message,req.body.contactNumber)
        if(msg.status=="success"){
            req.body.sendStatus="success"
        }
    }
    console.log('ppppppppppppppppppp')
    const newTest=await PCRTest.create(req.body)
    await HospitalRecord.findOneAndUpdate(
        {hospital:req.user.hospital,date:today},
        {$push:{active:newTest._id}},
        {upsert: true})
    res.status(201).json({
        status:'success',
        data:{
            test:newTest
        }
    })
})

exports.confirmPCRTest=catchAsync(async (req,res)=>{
   console.log('fghfhfyhfhhhhhhhhhhhhhhhhhhhhhhhhhh')
   // console.log(req.user._id)
    const test=await PCRTest.updateMany({_id:{
        $in:req.body.ids
    }},{
        confirm:{confirmBy:req.user._id}
    })
    const positive =await PCRTest.where({confirm:{$exists:true},_id:{$in:req.body.ids}, result:"positive"}).countDocuments();
    const negative =await PCRTest.where({confirm:{$exists:true},_id:{$in:req.body.ids}, result:"negative"}).countDocuments();
    // await dashBoard.create({
    //     positive:positive,
    //     negative:negative,
    //     creation:req.user
    // })
    console.log("afwefwefwefw")
    console.log(test)
    await dashBoardController.addPCRResults(Date.now(),positive,negative,req.user)
    if(!test){
        return next(new AppError("No patient found with that ID",404))    //used return statement to avoid executing code below
    }
    res.status(200).json({
        status:'success',
        data:{
            test, 
            ids: req.body.ids
        }
    })
})

exports.getPositive=catchAsync(async (req,res,next)=>{
    const tests=await PCRTest.find({'hospital':req.user.hospital, 'status':'active'})
    if(!tests){
        return next(new AppError("No positive Test found",404))    //used return statement to avoid executing code below
    }
    res.status(200).json({
        status:'success',
        data:{
            tests
        }
    })
})

exports.getNonConfirm=catchAsync(async (req,res,next)=>{
    const tests=await PCRTest.find({'hospital':req.user.hospital, 'confirm.confirmBy':{ $exists: false}})
    if(!tests){
        return next(new AppError("No positive Test found",404))    //used return statement to avoid executing code below
    }
    res.status(200).json({
        status:'success',
        data:{
            tests
        }
    })
})

exports.changeStatus=catchAsync(async (req,res,next)=>{
    const test = await PCRTest.findByIdAndUpdate(req.params.id, req.body,{
        runValidators:true
    })
    if(!test){
        return next(new AppError("No PCR Test found with that ID",404))    //used return statement to avoid executing code below
    }
    if(test.status==req.body.status){
        return next(new AppError(`PCR test alredy marked as ${req.body.status}`,404))
    }
    if(req.body.status=='recovered'){
        await HospitalRecord.findOneAndUpdate(
            {hospital:req.user.hospital,date:new Date(new Date().toLocaleDateString())},
            {$push:{recovered:test._id}},
            {upsert: true})
    }else if(req.body.status=='death'){
        await HospitalRecord.findOneAndUpdate(
            {hospital:req.user.hospital,date:new Date(new Date().toLocaleDateString())},
            {$push:{death:test._id}},
            {upsert: true})
    }
    res.status(200).json({
        status:'success',
        data:{
            test
        }
    })
})

