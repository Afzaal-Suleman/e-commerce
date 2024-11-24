const { Product } = require("../model/product");

// 1
exports.createProduct = async (req, res) => {
    try {
        const newProduct = new Product(req.body);
        const savedProduct = await newProduct.save();
        res.status(201).send({ message: 'Product created successfully', product: savedProduct });
    } catch (err) {
        res.status(500).send({ message: 'Error saving product', error: err });
    }
};

// 2

exports.fetchAllProduct = async (req, res) => {
    try {
        
        let fetchProduct = await Product.find({});
        const count = await Product.countDocuments({});
        
        if (req.query.sort === 'desc') {
            fetchProduct = fetchProduct.sort((a, b) => b.price - a.price); // Descending order
        } else if (req.query.sort === 'asc') {
            fetchProduct = fetchProduct.sort((a, b) => a.price - b.price); // Ascending order
        } else {
            // Shuffle the array for random order
            fetchProduct = fetchProduct.sort(() => Math.random() - 0.5);
        }

        // Send the response with the fetched products
        res.status(200).send({ message: 'Products fetched successfully', fetchProduct, count });
    } catch (err) {
        // Handle errors and send a 500 response
        res.status(500).send({ message: 'Error fetching products', error: err });
    }
};


// 3
exports.fetchByCategories = async (req, res) => {
    try {
        const category = req.query.category || ''; // Get the category from query parameters
        const fetchByCategory = await Product.find(category ? { category } : {}); // If category is provided, filter by it
        res.status(200).send({ message: 'Products fetched successfully', fetchByCategory });
    } catch (err) {
        res.status(500).send({ message: 'Error fetching products', error: err });
    }
};

// 4
exports.fetchCategories = async (req, res) => {
    try {
        // Use the distinct method to get all unique categories
        const categories = await Product.distinct("category");

        res.status(200).send({ message: 'Categories fetched successfully', categories });
    } catch (err) {
        res.status(500).send({ message: 'Error fetching categories', error: err });
    }
};
exports.fetchBrands = async (req, res) => {
    try {
        // Use the distinct method to get all unique categories
        const brand = await Product.distinct("brand");

        res.status(200).send({ message: 'Brands fetched successfully', brand });
    } catch (err) {
        res.status(500).send({ message: 'Error fetching categories', error: err });
    }
};
exports.fetchProductById = async (req, res) => {
    try {
        // Use the distinct method to get all unique categories
        const productId = req.params.id;
        const product = await Product.findById(productId);

        res.status(200).send({ message: 'Product fetched successfully', product });
    } catch (err) {
        res.status(500).send({ message: 'Error fetching categories', error: err });
    }
};

exports.editProduct = async(req, res) =>{
    try {
        const id = req.body._id

        const {title, description, price, discountPercentage, rating, stock, brand, category, thumbnail, images} = req.body
        const update = {
            title,
            description, price, discountPercentage, rating, stock, brand, category, thumbnail, images
        }
        const updateProduct = await Product.findByIdAndUpdate(id, update);
        res.status(200).send({ message: 'Product update successfully', updateProduct });

    } catch (error) {
        res.status(500).send({ message: 'Error fetching categories', error: err });
    }
}