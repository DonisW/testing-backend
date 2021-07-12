const {Schema, model} = require("mongoose");

const orderSchema = new Schema ({
    orderType:{type: string, required: true},
    products:{type: string, required: true},
    paymentMethod:{type: String, required: true},
    amount:{type: Number, required: true},
    date:{type: Date, default: Date.now}
})

module.exports = model("Pedidos", orderSchema);