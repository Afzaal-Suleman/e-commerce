const { Cart } = require("../model/Cart")

exports.createCart = async (req, res)=>{
    try {
        const {product, user, quantity} = req.body
        if (!product || !user || !quantity) {
            return res.status(400).send({ message: 'All fields are required' });
        }const cartItem = new Cart({
            product,
            user,
            quantity
        });

        const savedCart = await cartItem.save();
        if (savedCart) {
            return res.status(201).send({ message: 'Added to cart successfully' });
        } else {
            return res.status(400).send({ message: 'Items not stored in cart' });
        }
    } catch (error) {
        return res.status(500).send({ message: 'Error saving product in cart', error: error.message });
    }
}


exports.selectCartItems = async (req, res)=>{
    try { 
        const { id } = req.params;
        
        const cartItems = await Cart.find({user: id}).populate('product').populate('user', 'name email role address orders')
        if(cartItems){
            return res.status(201).send({ message: 'Select cart Item successfully',  cartItems });
        }
        else{
            return res.status(401).send({ message: 'cart is empty',  cartItems });
        }
    } catch (error) {
        res.status(500).send({ message: 'Error', error: error });
        
    }
}

exports.deleteCartItem = async(req, res)=>{
    try {
        const { id } = req.params;
        const deleteItem = await Cart.findByIdAndDelete(id)
        res.status(201).send({ message: 'Delete cart Item successfully',  deleteItem });

    } catch (error) {
        res.status(500).send({ message: 'Error', error: error });
    }
}
exports.updateCartItem = async(req, res)=>{
    try {
        const { id } = req.params
       const cartItems = await Cart.findByIdAndUpdate(id, req.body)
       if(cartItems){
        return res.status(201).send({ message: 'update successfuly', cartItems });
    }else{
        return res.status(401).send({ message: 'Some thing wrong', cartItems });
    }
    } catch (error) {
        return res.status(500).send({ message: 'Error', error: error }); 
    }
}

exports.deleteAllCartItem = async(req, res)=>{
    try {
        const { id } = req.params;
        const deleteItem = await Cart.deleteMany({user: id})
        res.status(201).send({ message: 'Delete cart Item successfully',  deleteItem });

    } catch (error) {
        res.status(500).send({ message: 'Error', error: error });
    }
}