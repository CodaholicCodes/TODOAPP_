const { check,validationResult }  =require('express-validator');
const User = require('../models/User');
const bcrypt=require('bcryptjs');

const sendGrid=require('@sendgrid/mail');
const SEND_GRID_API=process.env.SEND_GRID_KEY;
// "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"
const {
  firstNameValidation,
  lastNameValidation,
  emailValidation,
  passwordValidation,
  confirmPasswordValidation,
  roleValidation,
  termsValidation
} = require('./validation');


sendGrid.setApiKey(SEND_GRID_API);
exports.getLogin=(req, res, next) => {

    res.render('auth/login',{pageTitle : "Login",
        isLoggedIn : false,
    });
}

exports.postLogin= async (req, res, next) => {
const {email , password}=req.body;
try{
const user=await User.findOne({email});
    if(!user){
        throw new Error("User not found");
            }

const isMatch=await bcrypt.compare(password,user.password);
if(!isMatch) {
    return res.render('auth/login',{
        
            pageTitle : "Login",
            isLoggedIn : false,
            errorMessages : ["Password Invalid"],
  
}
  );
}
    req.session.isLoggedIn= true; 
    req.session.user=user;
    await req.session.save();
   
res.redirect('/');
}catch(error){
  res.render('auth/login',{
        
            pageTitle : "Login",
            isLoggedIn : false,
            errorMessages : [error.message],
    });
}
}    
exports.postLogout=(req, res, next) => {
console.log(req.session);
req.session.destroy();
res.redirect('/auth/login');

}

exports.getSignup=(req,res,next)=>{
res.render('auth/signup',{
    pageTitle : "SignUp-Airbnb",
    hasErrors: false,
    errorMessages: [],
    oldInput: {}
})
}



exports.postSignup=[
firstNameValidation,
lastNameValidation,
emailValidation,
passwordValidation,
confirmPasswordValidation,
roleValidation,
termsValidation,
 async (req,res,next)=>{
    const errors=validationResult(req);

   if(!errors.isEmpty()){
    return res.status(422).render('auth/signup',{
    pageTitle : "SignUp-Airbnb",
    hasErrors: true,
    errorMessages : errors.array().map(error=>error.msg),
    isLoggedIn : false,
    oldInput : req.body,
    }
    )  
}

  const {FirstName,LastName,email,password,role}=req.body;

  try{
const hashedPassword=await bcrypt.hash(password,12);
  const user=new User({
   FirstName,LastName,
   email,
   password: hashedPassword,
   role,
    });
 await user.save();

const welcomeEmail={
  to: email,
  from : process.env.FROM_EMAIL,
  subject : 'Welcome to airbnb', 
  html : `<h1>Welcome ${FirstName} ${LastName} to our family.Please book your first vacation home with us </h1>`
}

 await sendGrid.send(welcomeEmail);

            console.log('User created successfully');
             return res.redirect('/auth/login');
  }catch(err){
        console.log(err)
        const messages = (err && err.code === 11000) ? ['An account with this email already exists.'] : [err.message || 'Something went wrong'];
        return res.status(422).render('auth/signup',{
        pageTitle : "SignUp-Airbnb",
        hasErrors: true,
        errorMessages : messages,
        isLoggedIn : false,
        oldInput : req.body,
  }
);
}
}
]


exports.getForgotPass=(req,res,next)=>{

    res.render('auth/forgot',{
      pageTitle : "Forgot-Password",
        isLoggedIn : false,
    }
    )
}

exports.postForgotPass=async (req,res,next)=>{
  const {email}=req.body;
  try{
  const user=await User.findOne({email});

const otp=Math.floor(100000 +Math.random()*900000).toString();
const otpExpiry=Date.now()+5*60*1000;
user.otp=otp;
user.otpExpiry=otpExpiry;
await user.save();

  console.log(user);
  if(!user){
  throw new Error ("No account with this email");
        }
        const msg={
          to : email,
          from : process.env.FROM_EMAIL,
          subject : "Reset Password Otp",
          html : `<h1> Reset Password otp </h1> <p> Your Otp is ${otp}</p>`
        }
 await sendGrid.send(msg);
  res.redirect(`/auth/reset-password?email=${email}`);


  }catch(err){
        res.render('auth/forgot-password',{
        pageTitle : "Forgot Password",
        hasErrors: false,
        isLoggedIn : false,
        user :req.session.user,
        errorMessages: [err],
        oldEmail: email, 
})
  }
}

exports.getResetPassword=(req,res,next)=>{
  console.log("Into Reset Password");
  const {email} =req.query;

    res.render('auth/reset-password',{
        pageTitle : "Reset Password",
        hasErrors: false,
        errorMessages: [],
        oldInput :{},
        email : email,
        isLoggedIn : false,
        user :req.session.user
    });
}


exports.postResetPassword=[
passwordValidation,
confirmPasswordValidation  
,async (req,res,next)=>{
    const errors=validationResult(req);

    if(!errors.isEmpty()){
     return res.status(422).render('auth/reset-password',{
     pageTitle : "Reset Password",
     hasErrors: true,
     errorMessages : errors.array().map(error=>error.msg),
     isLoggedIn : false,
     oldInput : req.body,
     email : req.body.email,
     }
     )  
}
  const {email,otp,password,confirmPassword}=req.body;
  console.log("Request body:", req.body);
  try{
  const user=await User.findOne({email});
  console.log("User found:", user ? "Yes" : "No");
  if(!user)
    throw new Error("No user found with this email");
   
  if(user.otpExpiry < Date.now())
   throw new Error("OTP has expired");
  
  if(user.otp !== otp)
     throw new Error("OTP does not match");


  const hashedPassword=await bcrypt.hash(password,12);
  user.password=hashedPassword;
  user.otp=undefined;
  user.otpExpiry=undefined;
  await user.save();
  console.log("New Password Set",password);
  console.log("Redirecting to login...");
  return res.redirect('/auth/login');
   }catch(error){
    return  res.render('auth/reset-password',{
        pageTitle : "Reset Password",
        hasErrors: true,
        errorMessages: [error.message],
        oldInput : req.body,
        email : email,
        isLoggedIn : false,
        user :req.session.user
    });
  }

}]