const HospitalRecord=require('./../models/hospitalRecords')
const APIfunctions=require('./../utils/apiFunctions')
const catchAsync= require('./../utils/catchAsync');
const AppError = require('../utils/appError');
const DashBoard=require('./../models/dashBoardModel')

// const schedule=require('node-schedule')

// schedule.scheduleJob('*/5 * * * * *',()=>{
//     console.log('running ....................')
// })

exports.refreshDashBoard= catchAsync(async (req,res,next)=>{
    const d = new Date()
    const today=`${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`.toString()
    // const y = new Date()
    d.setDate(d.getDate() - 1);
    const yesterday=`${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`
    // console.log(today,yesterday)
    const records=await HospitalRecord.find({date:today}).populate({
        path:'hospital',
        select:'address.district'
    })
    var totActive=0
    var totRecovered=0
    var totDeath=0
    var totDistricts={}
    const yesterdayRecord=await DashBoard.findOne({},{},{ sort: { 'date' : -1 } })
    // console.log(yesterdayRecord)
    if(yesterdayRecord){
        totActive=yesterdayRecord.totalActiveCases
        totRecovered=yesterdayRecord.totalRecovered
        totDeath=yesterdayRecord.totalDeaths
        totDistricts=yesterdayRecord.districtTotals
    }
    const active={}
    const recovered={}
    const death={}
    records.forEach(p)
    function p(value){
        if(!active[value.hospital.address.district]) active[value.hospital.address.district]=0
        if(!recovered[value.hospital.address.district]) recovered[value.hospital.address.district]=0
        if(!death[value.hospital.address.district]) death[value.hospital.address.district]=0
        if(!totDistricts[value.hospital.address.district]) totDistricts[value.hospital.address.district]=0
        active[value.hospital.address.district]=active[value.hospital.address.district]+value.active.length
        recovered[value.hospital.address.district]=recovered[value.hospital.address.district]+value.recovered.length
        death[value.hospital.address.district]=death[value.hospital.address.district]+value.death.length
        totDistricts[value.hospital.address.district]=totDistricts[value.hospital.address.district]+value.active.length
        totActive=totActive+value.active.length
        totRecovered=totRecovered+value.recovered.length
        totDeath=totDeath+value.death.length
    }

    await DashBoard.updateOne({date:today},
        {dailyRecovered:recovered,dailyDeaths:death,dailyActiveCases:active,
        totalRecovered:totRecovered,totalDeaths:totDeath,totalActiveCases:totActive,districtTotals:totDistricts},
        {upsert: true})
    res.status(201).json({
        status:'success',
        data:{
            test:records
        }
    })
})

