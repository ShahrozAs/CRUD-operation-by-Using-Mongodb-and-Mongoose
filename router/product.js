const express=require('express')
const productController=require('../controller/product')
var route = express.Router();


route.get('/',productController.read)
route.get('/ssr',productController.readSSR)
.get('/:id',productController.readById)
.post('/',productController.create)
.put('/:id',productController.replace)
.patch('/:id',productController.update)
.delete('/:id',productController.Delete)

exports.route=route