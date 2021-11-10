const express = require('express');
const cookieParser= require('cookie-parser')
const morgan = require('morgan');
const helmet = require('helmet')
const cors = require('cors');

const AppError = require('./utils/appError')
const globalErrorHandler = require('./controllers/errorController')

const patientRouter=require('./routes/patientRoutes')
const pcrTestRouter=require('./routes/pcrTestRoutes')
const userRouter=require('./routes/userRoutes')
const AdminRouter=require('./routes/adminRoutes')
const HospitalRouter=require('./routes/hospitalRoutes')
const medicalHistoryRouter=require('./routes/medicalHistoryRoutes')
const dashBoardRouter =require('./routes/dashboardRoutes')

const app=express();

//const port = 3000;

if(process.env.NODE_ENV==='development'){
    app.use(morgan('dev'))
}

app.use(cookieParser())
app.use(helmet())   //SET SECURITY HTTP
//app.use(cors());
app.use(cors({
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
    origin: ['http://localhost:3000']
}));
app.use(express.json());  //BODY PARSER -> READING DATA FROM BODY INTO req.body

app.use((req, res, next)=>{
    // console.log(req.headers)
    next()
})


app.use('/api/v1/patients',patientRouter)
app.use('/api/v1/users',userRouter)
app.use('/api/v1/pcr',pcrTestRouter)
app.use('/api/v1/staff',AdminRouter)
app.use('/api/v1/hospital',HospitalRouter)
app.use('/api/v1/med',medicalHistoryRouter)
app.use('/api/v1/dashboard',dashBoardRouter)

app.all('*',(req,res,next)=>{
    // res.status(404).json({
    //     status:'fail',
    //     message:`Invaid URL - ${req.originalUrl}`
    // })
    // const err = new Error(`Invaid URL - ${req.originalUrl}`)
    // err.status = 'fail',
    // err.statusCode =404
    // next(err)      // when we pass anything as a para to next() it automatically knows that is an error

    next(new AppError(`Invaid URL - ${req.originalUrl}`,404))
})

app.use(globalErrorHandler)      //Error handling MIDDLEWARE

module.exports=app;