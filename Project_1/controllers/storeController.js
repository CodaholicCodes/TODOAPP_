
const Home=require('../models/Home');
const User = require('../models/User');
const path=require('path');
const rootDir=require('../utils/path-utils');

exports.getHomes=(req,res,next)=>{
Home.find().then(registeredHomes=>{
res.render('store/homes',
  {homes : registeredHomes , 
  pageTitle: 'Airbnb - Homes',
      isLoggedIn : req.session.isLoggedIn,
         user : req.session.user
});
});
}
  exports.getIndex=(req,res,next)=>{
Home.find().then(registeredHomes=>{
res.render('store/index',
  {homes : registeredHomes, 
  pageTitle: 'Airbnb - Find Your Perfect Stay',
      isLoggedIn : req.session.isLoggedIn,
         user : req.session.user
});
});
}

    exports.getHomeDetails = (req, res, next) => {
      console.log("Came to home details page",req.params);
      const homeId = req.params.homeId;
      Home.findById(homeId).then(home => {
        
        if(!home)
{
  console.log("Home not found");
  res.redirect('/homes');
}
else {
  console.log("Came to home details page", homeId, home);
  res.render('store/homeDetails', {
    home : home,
    pageTitle: 'Details of Home'
    ,
  isLoggedIn : req.session.isLoggedIn,
     user : req.session.user
  });
}
});
} 

exports.getFavourites=async (req,res,next)=>{
  const userId=req.session.user._id;
   try{
  const user=await User.findById(userId).populate('favouriteHomes');
   res.render('store/favourites',
       {
            homes : user.favouriteHomes , 
            pageTitle: 'My Favourites',
            isLoggedIn : req.session.isLoggedIn,  
            user : req.session.user  
   });
   }catch(error){
    console.log("Error while loading favourites ",error);
    res.redirect('/');
   }
}

exports.postFavourites = async (req, res, next) => {
 
  const homeId = req.body.homeId; 
  const userId=req.session.user._id;
  try{
const user=await  User.findOne({_id: userId});
if(!user.favouriteHomes.includes(homeId)){
  user.favouriteHomes.push(homeId);
  await user.save();
}
  }catch(error){
     console.log("Error saving favourite:", error);
    
  }finally{
    res.redirect('/favourites');
  }


};

  exports.postDeleteFavourite=(req,res,next)=>{
    const homeId=req.params.homeId;
    console.log("Came to delete favourite",homeId);
    console.log("Looking for homeId:", homeId);
   Favourite.findOneAndDelete({homeId: homeId}).then(result=>{
     console.log("Deleted from favourites",result);
     res.redirect("/favourites");
   }).catch(error=>{
     console.log("Error deleting favourite:", error);
     res.redirect("/favourites");
   });
  }

  exports.getRules=(req,res,next)=>{
  const homeId=req.params.homeId;
  console.log("Came to download Rules :",homeId);
  const rulesFileName="Airbnb_House_Rules.pdf";
  const filePath=path.join(rootDir,'rules',rulesFileName);

  res.download(filePath,'Rules.pdf');

  }