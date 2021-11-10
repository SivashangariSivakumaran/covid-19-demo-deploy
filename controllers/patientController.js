const Patient=require('./../models/patientModel')

const APIfunctions=require('./../utils/apiFunctions')
const catchAsync= require('./../utils/catchAsync');
const AppError = require('../utils/appError');


exports.getPatient = catchAsync(async (req, res,next) => {
    console.log(req.params.id)
    const patient=await Patient.findById(req.params.id).populate({
        path:'pcrTest medicalHistory user',
        select: '-__v -name -passwordResetToken'
    })    //Patient.findOne({_id:req.params.id})
    if(!patient){
        return next(new AppError("No patient found with that ID",404))    //used return statement to avoid executing code below
    }
    res.status(200).json({
    status: 'success',
    data: {patient}
    });
})

exports.getAdmittedPatients = catchAsync(async (req, res,next) => {
    // console.log("-----------------------")
    // const patients=await Patient.find({ "currentMedicalHistory": { $ne: null } })
    // .select('-medicalHistory -pcrTest')
    // .populate({
    //     path:'currentMedicalHistory',
    //     match:{hospital:req.user.hospital}
    // })
    // .where({ "currentMedicalHistory": { $ne: null } })
    // .populate("user")

    const patients=await Patient.aggregate([
        {
            $match:{"currentMedicalHistory": { $ne: null }}
        },
        { $lookup: {
            from: "medicalhistories",
            localField:"currentMedicalHistory",
            foreignField: "_id",
            as: "currentMedicalHistory"
            }
        },
        { $lookup: {
            from: "users",
            localField:"user",
            foreignField: "_id",
            as: "user"
            }
        },
        {
            $unwind:
              {
                path: '$currentMedicalHistory',
              }
        },
        {
            $unwind:
              {
                path: '$user',
              }
        },
        {
            $match:{"currentMedicalHistory.hospital": req.user.hospital}
        },
        // {
        //     $project:{
        //         _id:1,
        //         hospital:"$current.hospital",
        //         name:"$userD.name",
        //         email:"$userD.email",
        //         birthday:"$user.birthday",
        //         address:"$user.address",
                
        //     }
        // }

    ])
    console.log(req.user.hospital)
    if(!patients){
        return next(new AppError("No patient found",404))
    }
    res.status(200).json({
    status: 'success',
    data: {patients}
    });
})

exports.getAllPatients = catchAsync(async (req, res,next) => {
    const patients=await Patient.find({}).populate({
        path:'pcrTest medicalHistory user',
        select: '-__v -passwordResetToken'
    })
    if(!patients){
        return next(new AppError("No patient found",404))
    }
    res.status(200).json({
    status: 'success',
    data: {patients}
    });
})

exports.getPatientByNIC = catchAsync(async (req, res,next) => {
    const patients=await Patient.find({'nic.nicno':req.params.nic}).populate({
        path:'pcrTest medicalHistory user',
        select: '-__v -passwordResetToken'
    })
    if(!patients){
        return next(new AppError("No patient found",404))
    }
    res.status(200).json({
    status: 'success',
    data: {patients}
    });
})

exports.updatePatient=catchAsync(async (req,res)=>{
    const patient=await Patient.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true
    })
    if(!patient){
        return next(new AppError("No patient found with that ID",404))    //used return statement to avoid executing code below
    }
    res.status(200).json({
        status:'success',
        data:{
            patient:patient
        }
    });
})

// exports.deletePatient=async (req,res)=>{
//     try{
//         const patient = await Patient.findByIdAndDelete(req.params.id)
//         if(!patient){
//             return next(new AppError("No patient found with that ID",404))    //used return statement to avoid executing code below
//         }
//         res.status(204).json({
//             status:'success',
//             data:null
//         })
//     }catch(err){                 //if schema doent stisfy error may occur VALIDATIO ERROR
//         res.status(404).json({
//             status:'fail',
//             message:err
//         })
//     }
// }


// exports.getPatientStats = async (req, res)=>{
//     try{
//         const stats= Patient.aggregate([
//             $match:{}
//         ])
//     }catch(err){
//         res.status(404).json({
//             status:'fail',
//             message:err
//         })
//     }
// }


