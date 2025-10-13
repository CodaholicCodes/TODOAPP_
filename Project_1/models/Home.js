

const mongoose=require('mongoose');


const HomeSchema=new mongoose.Schema({
HouseName : {type : String, required : true},
price : {type : Number, required : true},
Location : {type : String, required : true},
rating : {type : Number, required : true},
photoUrl : {type : String, required : true},
description : {type : String},
host : {
       type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
}

});


module.exports=mongoose.model('Home',HomeSchema);

 
 
 
 
