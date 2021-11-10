const mongoose=require('mongoose')
const slugify = require('slugify')
const patientSchema =new mongoose.Schema({
    // name:{
    //     type:String,
    //     required:[true,'A patient must have a name'],
    //     unique:true
    // },
    // slug:String,
    // age:{
    //     type:Number,
    //     required:[true, 'A patient must hae a age']
    // },
    createdAt:{
        type:Date,
        default:Date.now,
        select:false
    },
    pcrTest:[{
        type:mongoose.Schema.ObjectId,
        ref: 'PCRTest'
    }],
    user:{
        type:mongoose.Schema.ObjectId,
        ref: 'User'
    },
    nic:{
        nicno:{
            type:String,
            required:[true,'A user should have unique NIC']
        },
        person:{
            type:String
        }
    },
    medicalHistory:[{
        type:mongoose.Schema.ObjectId,
        ref:'MedicalHistory'
    }],
    currentMedicalHistory:{
        type:mongoose.Schema.ObjectId,
        ref:'MedicalHistory'
    },
    confidential:Boolean
// },{
//     toJSON:{virtuals:true},
//     toObject:{virtuals:true}
})

// derive informations from existing informations stored in DB. this will send data when we request. we have to specify in modal that we need virtual info.
// patientSchema.virtual('#name').get(function(){  
//     return this.#filed/3
// })

// patientSchema.pre('save',function(next){    //RUN BEFORE  .SAVE, AND .CREATE()
//     this.slug=slugify(this.name, {lower:true})
//     // console.log(this)
//     next()
// })
patientSchema.post('save', function(doc,next){
    // console.log("pre fin post")
    next()
})
patientSchema.post('save', function(doc,next){      //document middleware
    // console.log(doc)
    next()
})

// patientSchema.pre('find',function(next){   
patientSchema.pre(/^find/,function(next){        //QUERY MIDDLEWARE
    this.find({confidential:{$ne:true}})                                 //this refre to query we can change query object from here
    next()
})
// patientSchema.pre(/^find/,function(next){        //QUERY MIDDLEWARE
//     this.populate({
//         path:'user'
//     })                                 //this refre to query we can change query object from here
//     next()
// })
patientSchema.pre(/^find/,function(next){        //QUERY MIDDLEWARE
    this.populate({
        path:'pcrTest',
        select:'-slug -age'
    })                                 //this refre to query we can change query object from here
    next()
})

patientSchema.index({nic: 1}, {unique: true});

const Patient=mongoose.model('Patient',patientSchema)

module.exports=Patient


//12 Vid