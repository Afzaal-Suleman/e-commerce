const Order = require('../model/Order');
const util = require('util');

exports.addOrder = async (req, res) => {
    try {
        // console.log(util.inspect(req.body, { showHidden: false, depth: null, colors: true }));
        if (!req.body.userid || !req.body.items || !req.body.totalAmount || !req.body.paymentMethod || !req.body.selectedAddress) {
            return res.status(400).send({ message: 'Invalid order data' });
        }
        const order = new Order(req.body);
        const savedOrder = await order.save();

        if (savedOrder) {
            return res.status(200).json({ message: 'Order saved successfully', savedOrder });
        } else {
            return res.status(400).send({ message: 'Order not stored in cart', savedOrder });
        }
    } catch (error) {
        return res.status(500).send({ message: 'Error saving product in cart', error: error.message });
    }
};

exports.getAllOrdersById = async (req, res)=>{
    try {
        const { id } = req.params
        if(!id){
            return res.status(400).json({ message: 'Please send id' });
        }
        const order = await Order.find({userid: id})
        if(order){
            return res.status(200).json({ message: 'Order fetch successfully', order });
        }else{
            return res.status(400).send({ message: 'Order not find' });
        }
    } catch (error) {
        return res.status(500).send({ message: 'Error fetch Order in Server', error: error.message });
    }
}

exports.getAllOrders = async (req, res)=>{
    try {
        const order = await Order.find()
        if(order){
            return res.status(200).json({ message: 'Order fetch successfully', order });
        }else{
            return res.status(400).send({ message: 'Order not find' });
        }
    } catch (error) {
        return res.status(500).send({ message: 'Server error', error: error.message });
        
    }
}

exports.updateOrderStatus = async(req, res)=>{
    try {
        const { id } = req.params
        if(!req.body){
            return res.status(400).json({message: 'send all values'})
        }
        const order = await Order.findByIdAndUpdate(id, req.body)
        if(order){
            return res.status(200).json({ message: 'status update successfully' });
        }else{
            return res.status(400).send({ message: 'Order not find' });
        }
    } catch (error) {
        return res.status(500).send({ message: 'Server error', error: error.message });
        
    }
}