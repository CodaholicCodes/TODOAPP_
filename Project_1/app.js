const ENV=process.env.NODE_ENV || 'production'
const path = require("path");

require('dotenv').config({
  path : `.env.${ENV}`
});
const helmet=require('helmet');
const compression=require('compression');
const express = require("express");
const fs=require('fs');

const rootDir=require('./utils/path-utils');
const morgan=require('morgan');
const logingStream=fs.createWriteStream(path.join(rootDir , 'access.log'), {flags : 'a'});

const app = express();

app.use(helmet());
app.use(compression());
app.use(morgan('combined',{stream : logingStream}));
const bodyParser = require("body-parser");


const multer=require('multer');
const {hostRouter}=require('./routers/hostRouter');
const storeRouter=require('./routers/storeRouter');
const session=require('express-session');
const mongodb_session=require('connect-mongodb-session');
const errorController=require('./controllers/errorController');





const mongoose=require('mongoose');
const MONGO_DB_URL=`mongodb+srv://Codaholic:${process.env.MONGO_DB_USERNAME}@${process.env.MONGO_DB_PASSWORD}.hy9pkfk.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority&appName=root`;
const MongoDbStore=mongodb_session(session);

const store=new MongoDbStore({
uri : MONGO_DB_URL,
collection : 'sessions'
});

const storage=multer.diskStorage({
  destination : (req,file,cb)=>{
  cb(null,path.join(rootDir, 'uploads'));
  },

 filename : (req,file,cb)=>{
cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname.replace(/[^a-zA-Z0-9.\-_() ]/g, '')); }

});
const fileFilter= (req,file,cb)=>{
  console.log("File Filter Called");
 const isValidFile=['image/jpeg' , 'image/jpg' , 'image/png'].includes(file.mimetype);
 console.log("File is : ",isValidFile);
 cb(null,isValidFile);
}

app.use(express.static(path.join(rootDir,"public")));

app.use('/uploads',express.static(path.join(rootDir,"uploads")));
app.use(bodyParser.urlencoded({extended : true}));
app.use(multer({storage,fileFilter}).single('photo'));

app.use(
  session({

  secret : 'KG Coding',
  resave : false,

  saveUninitialized : true,
  store : store
}))


app.use("/host",(req,res,next)=>{
if(!req.session.isLoggedIn){
  return res.redirect('/auth/login');  
}
next();
});

app.use(storeRouter);

app.use("/host",hostRouter);
const {authRouter}  = require("./routers/authRouter");
app.use(authRouter);


app.set("view engine","ejs");
app.set("views","views");

app.use((req, res, next) => {
  console.log("Request Recieved", req.url, req.method, req.body);
  next();
});




app.use(errorController.getError);
const PORT = process.env.PORT || 3001;
mongoose.connect(MONGO_DB_URL).then(() => {
app.listen(PORT, () => {
  console.log(`Server running at : http://localhost:${PORT}/`);
});
})

