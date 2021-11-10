const mongoose=require('mongoose')
const hospitalRecordsSchema =new mongoose.Schema({
    hospital:{
        type:mongoose.Schema.ObjectId,
        ref: 'Hospital',
        required:true
    },
    date:{
        type:Date,
        required:true
    },
    active:[{
        type:mongoose.Schema.ObjectId,
        ref:'PCRTest'
    }],
    recovered:[{
        type:mongoose.Schema.ObjectId,
        ref:'PCRTest'
    }],
    death:[{
        type:mongoose.Schema.ObjectId,
        ref:'PCRTest'
    }]
})

const HospitalRecord=mongoose.model('HospitalRecord',hospitalRecordsSchema)
module.exports=HospitalRecord
