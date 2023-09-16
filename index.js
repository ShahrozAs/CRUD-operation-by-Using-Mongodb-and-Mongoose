const express = require("express");
const app = express();
app.use(express.json());
const cors = require("cors");
app.use(cors());
const mongoose = require("mongoose");

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/localEcommerce");
  console.log("connected to DataBase");
}

const productRouter = require("./router/product");
app.use("/products", productRouter.route);

app.listen(8001, () => {
  console.log("Server Started");
});
