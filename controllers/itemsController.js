const TodoItem = require("../models/TodoItem");

exports.postTodos=async (req,res,next)=>{
try{
    console.log(req.body);
const todoItem=new TodoItem(req.body);
const item=await todoItem.save();
res.json(item);

}catch(err){
    console.log(err);
    res.status(500).json({message :err});
}
}

exports.getTodos=async (req,res,next)=>{
try{
const items=await TodoItem.find();
console.log("items : ",items);
res.json(items);
}catch(err){
    console.log(err);
    res.status(500).json({message :err});
}
}

exports.deleteTodos=async (req,res,next)=>{
    console.log("Requested Req : ",req.params);
    const id=req.params.id;
    console.log(id.substring(1));
    try{
    const deletedItem=await TodoItem.findByIdAndDelete(id.substring(1));
    console.log("Deleted item : ",deletedItem);
    res.json(deletedItem);
    }catch(err){
      res.status(500).json({message : err});
    }
    
}


exports.updateTodos=async (req,res,next)=>{

    const id=req.params.id;
  
    try{
    const updatedItem=await TodoItem.findByIdAndUpdate(id.substring(1),req.body,{new : true});
    res.json(updatedItem);
    }catch(err){
      res.status(500).json({message : err});
    }
    
}
