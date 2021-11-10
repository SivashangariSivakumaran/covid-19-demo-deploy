const DashBoard=require('./../models/dashBoardModel')
const Ward=require('./../models/wardModel')
const Hospital=require('./../models/hospitalModel')
const APIfunctions=require('./../utils/apiFunctions')
const catchAsync= require('./../utils/catchAsync');
const AppError = require('../utils/appError');


exports.addPCRResults=async (date,positive,negative,user)=>{
    await DashBoard.updateOne(
        {date:{
            $gt: new Date('2021-09-18'),
            $lt: new Date('2021-09-21')}},
        {
            date:'2021-09-20',
            $push:{
                cases:{
                    positive:positive,
                    negative:negative,
                    createdBy:user.name
                }
            }
        },
        {upsert: true}
    )
}


exports.publicDashBoard= catchAsync(async (req,res,next)=>{
    const d = new Date()
    const today=`${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`.toString()
    const dashboard = await DashBoard.findOne({},{},{ sort: { 'date' : -1 } }).select('totalActiveCases totalRecovered totalDeaths districtTotals -_id');
    const activecases = await DashBoard.find().select('totalActiveCases date -_id')
    const recovered = await DashBoard.find().select('totalRecovered date -_id')
    const deaths = await DashBoard.find().select('totalDeaths date -_id')
    var hospital = await Ward.aggregate([
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
        {
            $project: {
               hospital: 1,
               noWards:1,
               totalBeds:1,
               admittedPatients : {$size:'$admittedPatients'},
            }
         },
         {
             $project:{
                hospital: 1,
                noWards:1,
                totalBeds:1,
                admittedPatients:1,
                freeBeds:{$subtract:['$totalBeds','$admittedPatients']}
             }
         },
         {
            $group:{
                _id:null,
               nohospital: {$sum:1},
               noWards:{$sum:'$noWards'},
               totalBeds:{$sum:'$totalBeds'},
               admittedPatients:{$sum:'$admittedPatients'},
               freeBeds:{$sum:'$freeBeds'},
            }
        },
        {
            $project:{
                _id:0,
               nohospital: 1,
               noWards:1,
               totalBeds:1,
               admittedPatients:1,
               freeBeds:1
            }
        }

    ])
    hospital=hospital[0]
    res.status(200).json({
        status:'success',
        data:{
            dashboard,
            activecases,
            recovered,
            deaths,
            hospital
        }
    })
})

exports.tot= catchAsync(async (req,res,next)=>{
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

exports.toti= catchAsync(async (req,res,next)=>{
    var stat = await Ward.aggregate([
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
        {
            $project: {
               hospital: 1,
               noWards:1,
               totalBeds:1,
               admittedPatients : {$size:'$admittedPatients'},
            }
         },
         {
             $project:{
                hospital: 1,
                noWards:1,
                totalBeds:1,
                admittedPatients:1,
                freeBeds:{$subtract:['$totalBeds','$admittedPatients']}
             }
         },
         {
            $group:{
                _id:null,
               nohospital: {$sum:1},
               noWards:{$sum:'$noWards'},
               totalBeds:{$sum:'$totalBeds'},
               admittedPatients:{$sum:'$admittedPatients'},
               freeBeds:{$sum:'$freeBeds'},
            }
        }

    ])
    stat=stat[0]
    res.status(200).json({
        status:'success',
        data:{
            stat,
        }
    })
})