const Hospital=require('../models/hospitalModel')
const Ward=require('../models/wardModel')
const APIfunctions=require('../utils/apiFunctions')
const catchAsync= require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getAllHospitals = async (req, res) => {
    try{
        // const patients=await Patient.find().where('name').equals('nimal')
        const features=new APIfunctions(Hospital.find(),req.query).filter().sort().select()
        const hospitals=await features.query
        res.status(200).json({
        status: 'success',
        requestedAt: req.requestTime,
        results: hospitals.length,
        data: {hospitals}
    });
    }catch(err){                 //if schema doent stisfy error may occur VALIDATIO ERROR
        res.status(404).json({
            status:'fail',
            message:err
        })
    }
};
exports.createHospital= catchAsync(async (req,res)=>{
    const newHospital=await Hospital.create(req.body)
    res.status(201).json({
        status:'success',
        data:{
            hospital:newHospital
        }
    })
})

// exports.createWard= catchAsync(async (req,res)=>{
//     const hospital=req.user.hospital
//     console.log(hospital)
//     const updatedHospital=await Hospital.findByIdAndUpdate(
//         hospital,   
//         {$push:{
//             wards:{
//                 name:req.body.name,
//                 totalBeds:req.body.totalBeds,
//             }
//         }},
//         // {upsert: true},
//         {new: true}
//     )
//     res.status(201).json({
//         status:'success',
//         data:{
//             hospital:updatedHospital
//         }
//     })
// })

exports.createWard= catchAsync(async (req,res)=>{
    req.body.hospital=req.user.hospital
    const newWard=await Ward.create(req.body)
    await Hospital.findByIdAndUpdate(req.body.hospital,{$push:{wards:newWard._id}},)
    res.status(201).json({
        status:'success',
        data:{
            ward:newWard
        }
    })
    // console.log(hospital)
    // const updatedHospital=await Hospital.findByIdAndUpdate(
    //     hospital,   
    //     {$push:{
    //         wards:{
    //             name:req.body.name,
    //             totalBeds:req.body.totalBeds,
    //         }
    //     }},
    //     // {upsert: true},
    //     {new: true}
    // )
    // res.status(201).json({
    //     status:'success',
    //     data:{
    //         hospital:updatedHospital
    //     }
    // })
})
exports.updateWard= catchAsync(async (req,res)=>{
    const ward=await Ward.findByIdAndUpdate(req.params.wardID,req.body,{
        new:true,
        runValidators:true
    })
    if(!ward){
        return next(new AppError("No ward found with that ID",404))
    }
    res.status(200).json({
        status:'success',
        data:{
            ward:ward
        }
    });
})


exports.getHospitalDetails= catchAsync(async (req,res,next)=>{
    const stat = await Ward.aggregate([
        {
            $unwind:
              {
                path: '$admittedPatients',
                preserveNullAndEmptyArrays: true
              }
        },
        {
            $group:{
                _id:'$hospital',
                totalBeds:{$sum:'$totalBeds'},
                noWards:{$sum:1},
                admittedPatients:{$push:'$admittedPatients'},
            },
            
        },
        { $lookup: {
            from: "hospitals",
            localField:"_id",
            foreignField: "_id",
            as: "hospitalDetails"
       }},
        {
            $project: {
               hospital: 1,
               hospitalDetails:1,
               noWards:1,
               totalBeds:1,
               admittedPatients : {$size:'$admittedPatients'},
            }
         },
         {
             $project:{
                hospital: 1,
                hospitalDetails:1,
                noWards:1,
                totalBeds:1,
                admittedPatients:1,
                freeBeds:{$subtract:['$totalBeds','$admittedPatients']}
             }
         }

    ])

    res.status(200).json({
        status:'success',
        data:{
            stat
        }
    })
})