const mongoose = require('mongoose')
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
const app = require('./app');
const schedule = require('./schedule')
//const path = require('path');

//const DB=process.env.DATABASE.replace('<PASSWORD>',process.env.DATABASE_PASSWORD)
MONGODB_CONNECTION_STRING = "mongodb+srv://crypterz:*****@cluster0.jl8h0.mongodb.net/covid?authSource=admin&replicaSet=atlas-y5iscl-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true"

mongoose.connect(process.env.MONGODB_URI || process.env.MONGODB_CONNECTION_STRING ,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useFindAndModify:false
  }
).then(con=>{
  // console.log(con.connections)
  console.log('DB connection succesful')
})

// if(process.env.NODE_ENV === 'production'){
//   app.use(express.static('frontend/build'));

//   app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html')); //relative path
//   });
// }


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
