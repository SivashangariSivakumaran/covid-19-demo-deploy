const crypto = require('crypto')
const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt=require('bcryptjs')
const uniqueValidator = require('mongoose-unique-validator');

const userSchema=new mongoose.Schema({
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
    email:{
        type:String,
        required:true,
        unique: true,
        lowercase:true,
        validate:[validator.isEmail, 'Please provide valid email']
    },
    birthday:{
        type:Date
    },
    contactNo:{
        type:Number
    },
    address:{
        line1:{
            type:String,
            required:true,
        },
        line2:{
            type:String
        },
        city:{
            type:String,
            required:true,
        },
        district:{
            type:String,
            required:true,
        },
    },
    password:{
        type:String,
        required:true,
        minlength:8,
        select:false
    },
    passwordConfirm:{
        type:String,
        required:true,
        validate:{           //only work oncereate and save
            validator:function(el){
                return el===this.password
            }
        }
    },
    passwordChangedAt:{
        type:Date,
        default:Date.now
    },
    role:{
        type:String,
        enum:['patient','admin','hospitalAdmin', 'hospital user']
    },

    // hospital_id:{
    //     type:String,
    //     required:false
    // },

    passwordResetToken: String,
    passwordResetExpire: Date
})
//ENCRYPT PASSWORD
userSchema.pre('save',async function(next){
    if(!this.isModified('password')) return next();     //Only run this if password was modified
    this.password=await bcrypt.hash(this.password,12)
    this.passwordConfirm=undefined
});

userSchema.pre('save',async function(next){
    if(!this.isModified('password') || this.isNew){
        return next()
    }
    this.passwordChangedAt=Date.now()-1000 //sometimes token is issue before this executed. to avoid that
    next()
})

userSchema.post('save', function(doc,next){      //document middleware
    // console.log(doc)
    next()
})

userSchema.methods.correctPassword = async function(candidatePwd, userPwd) {
    return await bcrypt.compare(candidatePwd,userPwd)
}
userSchema.methods.changePasswordAfter = function(JWTtime){
    // console.log(this)
    // console.log(JWTtime)
    // console.log(this.passwordChangedAt.getTime()/1000)
    return (this.passwordChangedAt.getTime()/1000)>JWTtime
}

userSchema.methods.resetToken=function(){
    const resetToken=crypto.randomBytes(32).toString('hex');
    this.passwordResetToken=crypto.createHash('sha256').update(resetToken).digest('hex')
    // console.log(resetToken,this.passwordResetToken)
    this.passwordResetExpire=Date.now() + 10*60*1000  //after 10 mins password reset token get expires
    return resetToken;
}
userSchema.plugin(uniqueValidator);
const User=mongoose.model('User',userSchema)
module.exports=User
