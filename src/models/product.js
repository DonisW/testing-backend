const {Schema, model} = require("mongoose");

const productSchema = new Schema ({
    nombre:{type: String, required: true},
    color:{type: String, required: true},
    modelo:{type: String, required: true},
    date:{type: Date, default: Date.now}
})

module.exports = model("Product", productSchema);

