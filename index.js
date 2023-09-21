const express = require("express");
const app = express();
app.use(express.json());
const cors = require("cors");
app.use(cors());
const mongoose = require("mongoose");
var jwt = require("jsonwebtoken");

// const path=require('path')
main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb+srv://MrSherry:kuchnahi@cluster0.bw4jkat.mongodb.net/EcommerceAtlas?retryWrites=true&w=majority");
  console.log("connected to DataBase");
}

app.use((req,res,next)=>{
  // const token=req.get('Authorization').split('Bearer ')[1];
  try {
    const token=req.get('Authorization')
    console.log(token)
    var decoded = jwt.verify(token, 'shhhhh');
    console.log(decoded)
    if(decoded.email){
      next();
    }
    else{
      res.sendStatus(401);
    }
  } catch (error) {
    res.sendStatus(401);
    
  }

})

// MiddleWare for static files 
app.use(express.static('build'))
// app.use('*',(req,res)=>{
//   res.sendFile(__dirname+"/build/index.html")
//   // res.sendFile(path.resolve(__dirname,'build','index.html'))
// })

const productRouter = require("./router/product");
const userRouter = require("./router/user");
app.use("/products", productRouter.route);
app.use("/users", userRouter.route);

app.listen(8001, () => {
  console.log("Server Started");
});
