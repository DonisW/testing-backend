const {Schema, model} = require("mongoose");

const ordertypeSchema = new Schema ({
    order:{type: String, required: true},
    status:{type: Boolean, default: true, required: true}
})

module.exports = model("orderType", ordertypeSchema);