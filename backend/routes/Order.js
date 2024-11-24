const express = require('express')
const { addOrder, getAllOrdersById, getAllOrders, updateOrderStatus } = require('../controllers/Order')

const routerOrder = express.Router()

routerOrder.post('/userorder', addOrder)
routerOrder.get('/getallordersbyid/:id', getAllOrdersById)
routerOrder.get('/getallorders', getAllOrders)
routerOrder.put('/updateorderstatus/id', updateOrderStatus)


exports.routerOrder = routerOrder;