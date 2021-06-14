const express=require('express')
const { addOrderItems,getOrder ,updatedOrderToPaid,sendClient,getUserOrders,getAllOrders,updatedOrderToDelivered} = require('../controllers/order')
const router=express.Router()
const {requireSignin,}=require('../controllers/user')
router.post('/order',requireSignin,addOrderItems)
router.get('/order/:id',requireSignin,getOrder)
// 
router.put('/order/:id/pay',requireSignin,updatedOrderToPaid)
router.put('/order/:id/delivered',requireSignin,updatedOrderToDelivered)
// sending paypal client id from the backend 
router.get('/order/config/paypal',sendClient)
// sending userOrders to the client
router.get('/myorders/:id',requireSignin,getUserOrders)
router.get('/allorders',requireSignin,getAllOrders)


module.exports=router