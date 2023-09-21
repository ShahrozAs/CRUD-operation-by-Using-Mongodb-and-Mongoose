
const model = require("../model/product");
const Product = model.Product;
const ejs=require('ejs')
const path =require('path')

exports.readSSR = async (req, res) => {
  const products = await Product.find();
  ejs.renderFile(path.resolve(__dirname,'../pages/index.ejs'), {products:products}, function(err, str){
    // str => Rendered HTML string
    res.send(str);
});
};
exports.read = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};
exports.readById = async (req, res) => {
  const id = req.params.id;
  const product = await Product.find({ id: id });
  res.json(product);
};
exports.create = async (req, res) => {
  const product = new Product(req.body);
  const ProductADD = await product.save();
  res.json(ProductADD);
};

exports.replace = async (req, res) => {
  const id = req.params.id;
  const product = await Product.findOneAndReplace({ id: id }, req.body,{new:true});
  res.json(product);
};
exports.update = async(req, res) => {
  const id = req.params.id;
  const product =await Product.findOneAndUpdate({"id":id},req.body,{new:true});
  res.status(201).json(product);
};
exports.Delete = async(req, res) => {
  const id = req.params.id;
  const product = await Product.findOneAndDelete({"id":id});
  res.status(201).json(product);
};
