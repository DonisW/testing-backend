const {Schema, model} = require("mongoose");
const products = require("./product")

const categorySchema = new Schema ({
     category:{type: String, required: true},
     status:{type: Boolean, default: true, required: true}
})

module.exports = model("Category", categorySchema);