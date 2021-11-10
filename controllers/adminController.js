const Admin=require('./../models/adminModel')
const APIfunctions=require('./../utils/apiFunctions')
const catchAsync= require('./../utils/catchAsync');
const AppError = require('../utils/appError');


exports.getAllUsers = async (req, res) => {
    try{
        // const patients=await Patient.find().where('name').equals('nimal')
        const features=new APIfunctions(Admin.find(),req.query).filter().sort().select()
        const users=await features.query
        res.status(200).json({
        status: 'success',
        requestedAt: req.requestTime,
        results: users.length,
        data: {users}
    });
    }catch(err){                 //if schema doent stisfy error may occur VALIDATIO ERROR
        res.status(404).json({
            status:'fail',
            message:err
        })
    }
};
exports.getUser = catchAsync(async (req, res,next) => {
        const user=await Admin.findById(req.params.id)     //Patient.findOne({_id:req.params.id})
        if(!user){
            return next(new AppError("No user found with that ID",404))    //used return statement to avoid executing code below
        }
        res.status(200).json({
        status: 'success',
        data: {user}
      });
})
exports.updateAccoumt=async (req,res)=>{
    try{
        const user=await Admin.findByIdAndUpdate(req.params.id,req.body,{
            new:true,
            runValidators:true
        })
        if(!user){
            return next(new AppError("No user found with that ID",404))    //used return statement to avoid executing code below
        }
        res.status(200).json({
            status:'success',
            data:{
                user:user
            }
        })
    }catch(err){                 //if schema doent stisfy error may occur VALIDATIO ERROR
        res.status(404).json({
            status:'fail',
            message:err
        })
    }
}


// exports.getUser = catchAsync(async (req, res,next) => {
//         const user=await Patient.findById(req.params.id)     //Patient.findOne({_id:req.params.id})
//         if(!user){
//             return next(new AppError("No user found with that ID",404))    //used return statement to avoid executing code below
//         }
//         res.status(200).json({
//         status: 'success',
//         data: {user}
//       });
// })

exports.createUser= catchAsync(async (req,res)=>{
        const newUser=await Admin.create(req.body)
        res.status(201).json({
            status:'success',
            data:{
                user:newUser
            }
        })
})

// exports.updatePatient=async (req,res)=>{
//     try{
//         const patient=await Patient.findByIdAndUpdate(req.params.id,req.body,{
//             new:true,
//             runValidators:true
//         })
//         if(!patient){
//             return next(new AppError("No patient found with that ID",404))    //used return statement to avoid executing code below
//         }
//         res.status(200).json({
//             status:'success',
//             data:{
//                 patient:patient
//             }
//         })
//     }catch(err){                 //if schema doent stisfy error may occur VALIDATIO ERROR
//         res.status(404).json({
//             status:'fail',
//             message:err
//         })
//     }
// }
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
