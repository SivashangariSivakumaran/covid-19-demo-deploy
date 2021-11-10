const mongoose=require('mongoose')
const slugify = require('slugify')
const adminSchema =new mongoose.Schema({
    hospital:{
        type:mongoose.Schema.ObjectId,
        ref:'Hospital'
    },
    user:{
        type:mongoose.Schema.ObjectId,
        ref: 'User'
    }
})

adminSchema.pre(/^find/,function(next){        //QUERY MIDDLEWARE
    this.find({confidential:{$ne:true}})                                 //this refre to query we can change query object from here
    next()
})

const Admin=mongoose.model('Admin',adminSchema)

module.exports=Admin
