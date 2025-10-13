const express=require('express');
const authRouter=express.Router();
 const authController=require('../controllers/authController');
// authRouter.get("/login")

authRouter.get("/auth/login",authController.getLogin);
authRouter.post("/auth/login",authController.postLogin);
authRouter.post("/auth/logout",authController.postLogout);
authRouter.get("/auth/signup",authController.getSignup);
authRouter.post("/auth/signup",authController.postSignup);
authRouter.get("/auth/forgot-password",authController.getForgotPass);
authRouter.post("/auth/forgot-password",authController.postForgotPass);
authRouter.get("/auth/reset-password",authController.getResetPassword);
authRouter.post("/auth/reset-password",authController.postResetPassword);


exports.authRouter=authRouter;




  