const express=require('express');
const storeRouter=express.Router();

const path=require('path');

const rootDir=require('../utils/path-utils');
const storeController=require('../controllers/storeController');

storeRouter.get("/",storeController.getIndex);
storeRouter.get("/homes",storeController.getHomes);
storeRouter.get("/homes/:homeId",storeController.getHomeDetails);
storeRouter.get("/favourites",storeController.getFavourites);
storeRouter.post("/favourites",storeController.postFavourites);

storeRouter.post("/favourites/delete-favourite/:homeId",storeController.postDeleteFavourite);
storeRouter.get("/rules/:homeId",storeController.getRules);
    module.exports=storeRouter;