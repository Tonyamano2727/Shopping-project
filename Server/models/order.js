const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var OrderSchema = new mongoose.Schema({
    products:[{
        product: {type : mongoose.Types.ObjectId, ref: 'Products'},
        count: Number,
        color: String,
    }],
    status:{
        type:String,
        default: 'Processing',
        enum : ['Cancelled' , 'Processing' , 'Successed'] // npm stripe if you use pay online
    },
    total: Number,
    coupon: {
        type: mongoose.Types.ObjectId, ref: 'Coupon'
    },
    orderBy:{
        type : mongoose.Types.ObjectId,
        ref: 'User'
    },
});

//Export the model
module.exports = mongoose.model('Order', OrderSchema);