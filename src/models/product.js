const {Schema, model} = require("mongoose");
const category = require("../models/category")

const productSchema = new Schema ({
    category:[{ type: Schema.Types.ObjectId, ref: "category", required: true}],
    name:{type: String, required: true},
    description:{type: String, required: true},
    model:{type: String, required: true},
    price:{type: Number, required: true},
    status:{type:Boolean, required: true, default: true},
    stock:{type: Number, required: true},
    date:{type: Date, default: Date.now}
});

module.exports = model("Product", productSchema);

