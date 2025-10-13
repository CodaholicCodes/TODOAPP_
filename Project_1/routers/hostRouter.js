const express=require('express');
const hostRouter=express.Router();

 const hostController=require('../controllers/hostController');

hostRouter.get("/add-home", hostController.getaddHome);
 

hostRouter.post("/add-home" , hostController.postaddHome) ;


hostRouter.get("/host-homes", hostController.getHostHomes) ;
 
hostRouter.get("/edit-homes/:homeId", hostController.getEditHomes);

hostRouter.post("/edit-home",hostController.posteditHome);

hostRouter.post("/delete-home/:homeId",hostController.postDeleteHome);

exports.hostRouter=hostRouter;




  