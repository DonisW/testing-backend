const {Schema, model} = require("mongoose");

const productSchema = new Schema ({
    name:{type: String, required: true},
    color:{type: String, required: true},
    model:{type: String, required: true},
    status:{type:Boolean, required: true, default: true},
    date:{type: Date, default: Date.now}
})

module.exports = model("Product", productSchema);

