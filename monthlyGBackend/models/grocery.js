const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GrocerySchema = new Schema(
    {
        groceryItem:String,
        isPurchased:Boolean,
    },
    {collection:'Grocery-Items'}
);

module.exports = mongoose.model("Grocery-Items",GrocerySchema)