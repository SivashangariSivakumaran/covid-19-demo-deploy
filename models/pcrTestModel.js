const mongoose=require('mongoose')
const slugify = require('slugify')
const Patient = require('./patientModel')
const pcrTestSchema =new mongoose.Schema({
    name:{
        firstName:{
            type:String,
            required:[true,'A user should enter first name'],
        },
       lastName:{
        type:String,
        required:[true,'A user should enter last name'],
       }
    },
    // nic:{
    //     type:String,
    //     required:[true,'A patient must have a nic number'],
    //     unique:false
    // },
    result:{
        type:String,
        enum:['positive','negative']
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        select:false
    },
    createdBy:{
        type:mongoose.Schema.ObjectId,
        ref:'User'
    },
    hospital:{
        type:mongoose.Schema.ObjectId,
        ref:'Hospital'
    },
    status:{
        type:String,
        enum:['active','recovered','death'],
        default:function(){
            if(this.result=='positive'){
                return 'active'
            }else{
                return undefined
            }
        }
    },
    confirm:{
        confirmBy:{
            type:String
        }
    },
    nic:{
        nicno:{
            type:String
        },
        person:{
            type:String
        }
    },
    contactNumber:{
        type:Number
    },
    sendStatus:{
        type:String,
        enum:['success','fail']
    }
})

// pcrTestSchema.pre('save',function(next){    //RUN BEFORE  .SAVE, AND .CREATE()
//     this.slug=slugify(this.first_name, {lower:true})
//     next()
// })
pcrTestSchema.post('save', function(doc,next){
    console.log("lllllllll")
    next()
})
pcrTestSchema.post('save', async function(doc,next){      //document middleware
    const test=await Patient.update(
        { "nic.nicno":this.nic.nicno},
        { "$push": { "pcrTest": this._id } })
    next()
})
pcrTestSchema.post('updateMany', function(doc,next){ 
    // console.log(doc)     //document middleware
    next()
})

// patientSchema.pre('find',function(next){   
pcrTestSchema.pre(/^find/,function(next){        //QUERY MIDDLEWARE
    this.find({confidential:{$ne:true}})                         //this refre to query we can change query object from here
    next()
})

const PCRTest=mongoose.model('PCRTest',pcrTestSchema)

module.exports=PCRTest
