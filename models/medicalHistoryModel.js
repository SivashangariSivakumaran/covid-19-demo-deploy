const mongoose=require('mongoose')
const Patient=require('./patientModel')
const medicalHistorySchema=new mongoose.Schema({
    patient:{
        type:mongoose.Schema.ObjectId,
        ref:'Patient'
    },
    hospital:{
        type:mongoose.Schema.ObjectId,
        ref:'Hospital'
    },
    ward:{
        type:mongoose.Schema.ObjectId,
        ref:'Ward',
        required:[true,'A medical report shoud have ward']
    },
    symptoms:[{
        date:{
            type:Date,
            default:Date.now()
        },
        description:[{
            type:String
        }]
    }],
    drugDetails:[{
        date:{
            type:Date,
            default:Date.now()
        },
        description:[{
            type:String
        }],
    }],
    admittedDate:{
        type:Date,
        default:Date.now
    },
    dischargeDate:{
        type:Date,
        default:null
    },
    changeHospital:{
        hospital:{
            type:mongoose.Schema.ObjectId,
            ref:'Hospital',
        },
        status:{
            type:String,
            enum:['pending','accepted','decline'],
        }
    }
})

medicalHistorySchema.post('save',async function(doc,next){
    await Patient.findByIdAndUpdate(this.patient,   
        {$push:{medicalHistory:this._id}},
        {upsert: true}
    )
    next()
})
const MedicalHistory=mongoose.model('MedicalHistory',medicalHistorySchema)
module.exports=MedicalHistory