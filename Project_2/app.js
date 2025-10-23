const ENV=process.env.NODE_ENV || 'production'

require('dotenv').config({
  path : `.env.${ENV}`
});
const express = require("express");

const cors = require('cors');

const app = express();
const mongoose=require('mongoose');
const bodyParser=require('body-parser');

const errorController=require('./controllers/errorController');
const itemsRouter=require('./routers/itemsRouter');
const MONGO_DB_URL=`mongodb+srv://Codaholic:${process.env.MONGO_DB_USERNAME}@${process.env.MONGO_DB_PASSWORD}.hy9pkfk.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority&appName=root`;
// app.use(express.static(path.join(rootDir,"public")));
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(itemsRouter);

// app.use("/host",hostRouter);
app.set("view engine","ejs");
app.set("views","views");
app.use((req, res, next) => {
  console.log("Request Recieved", req.url, req.method, req.body);
  next();
});
app.use(errorController.getError);
const port=process.env.PORT || 5000;
mongoose.connect(MONGO_DB_URL).then(() => {
app.listen(port, () => {
  console.log(`Server running at : http://localhost:${port}/`);
});
})

