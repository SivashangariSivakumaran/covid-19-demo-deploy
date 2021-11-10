const MedicalHistory=require('./../models/medicalHistoryModel')
const APIfunctions=require('./../utils/apiFunctions')
const catchAsync= require('./../utils/catchAsync');
const AppError = require('../utils/appError');
const Patient=require('./../models/patientModel')
const Ward=require('./../models/wardModel')

// exports.getAllTest = async (req, res) => {
//     try{
//         const features=new APIfunctions(PCRTest.find(),req.query).filter().sort().select()
//         const tests=await features.query
//         res.status(200).json({
//         status: 'success',
//         requestedAt: req.requestTime,
//         results: tests.length,
//         data: {tests}
//     });
//     }catch(err){                 //if schema doent stisfy error may occur VALIDATIO ERROR
//         res.status(404).json({
//             status:'fail',
//             message:err
//         })
//     }
// };

exports.createMedical= catchAsync(async (req,res,next)=>{
    if(req.body.patient==null){
        req.body.patient=req.params.id
    }
    const patient=await Patient.findById(req.body.patient)
    if(patient.currentMedicalHistory){
        return next(new AppError("Patient already have active medical Report",404))
    }
    if(!req.body.createdBy){
        req.body.createdBy=req.user.id
    }
    req.body.hospital=req.user.hospital
    const medHistory=await MedicalHistory.create(req.body)
    const patientID=await Patient.findByIdAndUpdate(req.body.patient,{"currentMedicalHistory":medHistory._id})
    await Ward.findByIdAndUpdate(req.body.ward,
        {$push:{admittedPatients:patientID._id}},)
    res.status(201).json({
        status:'success',
        data:{
            test:medHistory
        }
    })
})

exports.addDrugs = catchAsync(async (req,res)=>{
    console.log(req.body)
    const medicalHistory=await MedicalHistory.findByIdAndUpdate(
        req.params.id,   
        {$push:{drugDetails:{description:req.body.description}}},
        {upsert: true,new: true},
    )
    res.status(200).json({
        status:'success',
        data:{
            medicalHistory:medicalHistory
        }
    })
})

exports.addSymptoms = catchAsync(async (req,res)=>{
    console.log(req.body)
    // const obj=req.body.map(el=>{
    //     'decription':el.
    // })
    const medicalHistory=await MedicalHistory.findByIdAndUpdate(
        req.params.id,   
        {$push:{symptoms:{description:req.body.description}}},
        {upsert: true,new: true},
    )
    res.status(200).json({
        status:'success',
        data:{
            medicalHistory:medicalHistory
        }
    })
})

// exports.update = catchAsync(async (req,res)=>{
//     await MedicalHistory.findByIdAndUpdate(req.params.id,req.body)
//     if(!medicalHistory){
//         return next(new AppError("No mediacl History found with that ID",404))    //used return statement to avoid executing code below
//     }
//     res.status(200).json({
//         status:'success',
//         data:{
//             medicalHistory:"medicalHistory"
//         }
//     })
// })

exports.getMedicalHistory = catchAsync(async (req, res,next) => {
    const med=await MedicalHistory.findById(req.params.id)    //Patient.findOne({_id:req.params.id})
    if(!med){
        return next(new AppError("No meical History found with that ID",404))    //used return statement to avoid executing code below
    }
    res.status(200).json({
    status: 'success',
    data: {med}
    });
})

exports.getAllMedicalHistory = catchAsync(async (req, res, next) => {
    var patientID
    if(req.user.role=="patient"){
        patientID=await Patient.findOne({user:req.user._id}).select('_id');
        console.log(patientID)
        patientID=patientID._id
        console.log(patientID)
    }else{
        patientID=req.params.id;
    }
    if(patientID==null){
        return next(new AppError("patientID cant be null",404))
    }
    console.log(patientID)
    const med=await MedicalHistory.find({patient:patientID},{},{ sort: { 'admittedDate' : -1 } }).populate({
        path:'hospital',
        select:'name -_id'
    })  //Patient.findOne({_id:req.params.id})
    if(!med){
        return next(new AppError("No meical History found with that ID",404))    //used return statement to avoid executing code below
    }
    console.log(med);
    res.status(200).json({
    status: 'success',
    data: {med}
    });
})

// exports.getAllMedicalHistory_Patient = catchAsync(async (req, res, next) => {
//     let id;
//     if(req.params.id){
//         id=req.params.id
//     }else{
//         id=req.user._id
//     }
//     const med=await MedicalHistory.findById(id)    //Patient.findOne({_id:req.params.id})
//     if(!med){
//         return next(new AppError("No meical History found with that ID",404))    //used return statement to avoid executing code below
//     }
//     res.status(200).json({
//     status: 'success',
//     data: {med}
//     });
// })

exports.discharge = catchAsync(async (req,res,next)=>{
    const patient=await Patient.findByIdAndUpdate(req.params.patientID,
        {"currentMedicalHistory":null})
    console.log(patient)
    if(!patient.currentMedicalHistory){
        return next(new AppError("Active Medical History not found for this patient",404))
    }
    const medicalHistory=await MedicalHistory.findByIdAndUpdate(
        patient.currentMedicalHistory,   
        {"dischargeDate":new Date()},
        {new:true}
    )
    await Ward.findByIdAndUpdate(medicalHistory.ward,{$pull:{admittedPatients:patient._id}})
    res.status(200).json({
        status:'success',
        data:{
            medicalHistory:medicalHistory
        }
    })
})

exports.changeHospital = catchAsync(async (req,res,next)=>{
    const patient=await Patient.findOne(req.params.patientID)
    if(!patient){
        return next(new AppError("No atient forun with that ID",404))
    }
    if(!patient.currentMedicalHistory){
        return next(new AppError("Active Medical History not found for this patient",404))
    }
    const reqhospital=req.body.hospital;
    const medicalHistory=await MedicalHistory.findByIdAndUpdate(
        patient.currentMedicalHistory,   
        {"changeHospital.hospital":reqhospital,"changeHospital.status":"pending"},
        {new:true}
    )
    res.status(200).json({
        status:'success',
        data:{
            medicalHistory:medicalHistory
        }
    })
})

exports.changeHospital_GetPending = catchAsync(async (req,res,next)=>{
    const meds=await MedicalHistory.find({'changeHospital.hospital':req.user.hospital,"changeHospital.status":'pending'})
    if(!meds){
        return next(new AppError("No patient change request found",404))
    }
    // if(!patient.currentMedicalHistory){
    //     return next(new AppError("Active Medical History not found for this patient",404))
    // }
    // const reqhospital=req.body.hospital;
    // const medicalHistory=await MedicalHistory.findByIdAndUpdate(
    //     patient.currentMedicalHistory,   
    //     {"changeHospital.hospital":reqhospital,"changeHospital.status":"pending"},
    //     {new:true}
    // )
    res.status(200).json({
        status:'success',
        data:{
            medicalHistory:meds
        }
    })
})

exports.changeHospital_accept = catchAsync(async (req,res,next)=>{
    const med=await MedicalHistory.findOneAndUpdate({_id:req.params.medID,dischargeDate:null},{"changeHospital.status":'accepted'});
    if(!med){
        return next(new AppError("No active mediacl history found",404))
    }
    res.status(200).json({
        status:'success',
        data:{
            medicalHistory:med
        }
    })
})

exports.changeHospital_decline = catchAsync(async (req,res,next)=>{
    const med=await MedicalHistory.findOneAndUpdate({_id:req.params.medID,dischargeDate:null},{"changeHospital.status":'decline'});
    if(!med){
        return next(new AppError("No active mediacl history found",404))
    }
    res.status(200).json({
        status:'success',
        data:{
            medicalHistory:med
        }
    })
})

exports.changeWard = catchAsync(async (req,res,next)=>{
    const patient=await Patient.findById(req.params.patientID)
    if(!patient){
        return next(new AppError("No atient forun with that ID",404))
    }
    if(!patient.currentMedicalHistory){
        return next(new AppError("Active Medical History not found for this patient",404))
    }
    const newward=req.body.ward;
    console.log(newward)
    if(!newward){
        return next(new AppError("Ward should be provided",500))
    }
    const med=await MedicalHistory.findByIdAndUpdate(patient.currentMedicalHistory,{ward:newward})
    if(!med){
        return next(new AppError("No active mediacl history found",404))
    }
   // await Ward.findByIdAndUpdate(newward,{$push:{admittedPatients:patientID}},)
   // await Ward.findByIdAndUpdate(med.ward,{$pull:{admittedPatients:patientID}})
    res.status(200).json({
        status:'success',
        data:{
            medicalHistory:med
        }
    })
})