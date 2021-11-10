const mongoose=require('mongoose')
const wardSchema =new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Ward must have a name']
    },
    hospital:{
        type:mongoose.Schema.ObjectId,
        ref:'Hospital'
    },
    totalBeds:{
        type: Number,
        default:0
        // required:[true,'Ward must have beds count']
    },

    admittedPatients:[{
        type:mongoose.Schema.ObjectId,
        ref: 'MedicalHistory'
    }]
})

const Ward=mongoose.model('Ward',wardSchema)
module.exports=Ward

