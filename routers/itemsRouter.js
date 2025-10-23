const express=require('express');
const itemRouter=express.Router();

const itemsController=require('../controllers/itemsController');

itemRouter.post("/todos",itemsController.postTodos);
itemRouter.get("/todos",itemsController.getTodos);
itemRouter.delete("/todos/:id",itemsController.deleteTodos);
itemRouter.patch("/todos/:id",itemsController.updateTodos);

    module.exports=itemRouter;