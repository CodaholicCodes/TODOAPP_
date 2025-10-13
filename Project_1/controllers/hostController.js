const Home=require('../models/Home');
const { deleteFile } = require('../utils/file');

exports.getaddHome=(req, res, next) => {
  res.render('host/edit-home', {
    pageTitle: "Add Home",
    editing: false,
    id:null,
    home: {},
      isLoggedIn : req.session.isLoggedIn,
         user : req.session.user
  });
}

  exports.postaddHome=(req,res,next)=>{
    const {HouseName,price,Location,rating,description}=req.body;
   console.log("Req Body :",req.body);
   console.log("House Photo",req.file);
   if(!req.file)
  return res.status(400).send("No Image Provided");
const photoUrl= req.file.filename;

 const newHome=new Home({
        HouseName,price,Location,rating,photoUrl,description,
        host : req.session.user._id,
      });
    newHome.save()
      .then((rows)=>{
   console.log("Home Added",rows);
   res.redirect('/host/host-homes');
      })
    }

exports.posteditHome=(req,res,next)=>{
 
  const {homeId,HouseName,price,Location,rating,description}=req.body;
  console.log("Came to edit home :");

     console.log("Req Body :",req.body);
   console.log("House Photo",req.file);

  Home.findById(homeId).then(home=>{
  if(!home){
    console.log("Home not found in DB for ID:", homeId);
  res.redirect('host/host-homes');
  }

   else{
      console.log(home);
  home.HouseName=HouseName;
  home.price=price;
  home.Location=Location;
  home.rating=rating;
  if(req.file){
    console.log("Came to delete : ",req.file);
    deleteFile(req.file.destination+"/"+home.photoUrl);
    home.photoUrl=req.file.filename
  }
  home.description=description;
return home.save();
  }
}).then(()=>{

      res.redirect('/host/host-homes');
       }).catch(error=>{
        console.log("Error while editing home",error);
       } 
      );
    }
  



    exports.getHostHomes=(req,res,next)=>{
      console.log("Fetching Homes");
    Home.find({host : req.session.user._id}).then(registeredHomes=>{
        res.render('host/host-homes',{
          homes : registeredHomes , 
          pageTitle: 'Your Homes',
  isLoggedIn : req.session.isLoggedIn,
     user : req.session.user
        });
    });
  }


  exports.getEditHomes = (req, res, next) => {
    const homeId = req.params.homeId;
    const editing = req.query.editing;

    console.log('Editing flag:', editing, 'Home ID:', homeId, 'Raw editing value:', req.query.editing);

    if (!editing) {
      console.log("Editing parameter not provided");
      return res.redirect('/host/host-homes');
    }

    Home.findById(homeId).then(home => {
    
      if (!home) {
        console.log("Home not found in DB for ID:", homeId);
        return res.redirect('/host/host-homes');
      }
    
      res.render('host/edit-home', { 
        home: home, 
        homeId: homeId, 
        pageTitle: "Edit Home", 
       editing :true,
       isLoggedIn : req.session.isLoggedIn,
      user : req.session.user,

      });
    });
  }

  exports.postDeleteHome = (req, res, next) => {
    const homeId = req.params.homeId;
    console.log("Deleting home with ID:", homeId);
    
    Home.findByIdAndDelete(homeId).then( ()=> {
  
      res.redirect('/host/host-homes');
    }).catch(error=>{
    console.log("Error while deleting home",error);
    }
    );
  }


