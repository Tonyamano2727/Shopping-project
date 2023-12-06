const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var productBlogCategorySchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true,  // duy nhat 0 trung nnhau
        index:true,
    },
},{
    timestamps: true
});

//Export the model
module.exports = mongoose.model('productBlogCategory', productBlogCategorySchema);