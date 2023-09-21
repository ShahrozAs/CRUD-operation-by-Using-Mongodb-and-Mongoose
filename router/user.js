const express=require('express')
const userController=require('../controller/user')
var route = express.Router();


route.get('/',userController.read)
route.get('/ssr',userController.readSSR)
.get('/:id',userController.readById)
.post('/',userController.create)
.put('/:id',userController.replace)
.patch('/:id',userController.update)
.delete('/:id',userController.Delete)

exports.route=route