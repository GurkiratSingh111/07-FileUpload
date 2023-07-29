const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        requiired: true,
    },
    price: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Product', ProductSchema)