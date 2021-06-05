const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FoodSchema = new Schema(
    {
        subItemName:String,
        image:String,
        price:Number,
        description:String
    },
    {collection:'food-cart-Items'}
);

module.exports = mongoose.model("food-cart-Items",FoodSchema);