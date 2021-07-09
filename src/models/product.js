const {Schema, model} = require("mongoose");

const productSchema = new Schema ({
    nombre:{type: string, required: true},
    color:{type: string, required: true},
    modelo:{type: string, required: true},
    date:{type: Date, default: Date.now}
})

module.exports = model("Product", productSchema)