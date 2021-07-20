const {Schema, model} = require("mongoose");
const products = require("./product")


const orderSchema = new Schema ({
    orderType:{type: String, required: true},
    product:[{ type: Schema.Types.ObjectId, ref: "products", required: true}],
    paymentMethod:{type: String, required: true},
    amount:{type: Number, default: 0, required: true},
    status:{type: Boolean, default: true, required: true},
    date:{type: Date, default: Date.now}
})

module.exports = model("Pedidos", orderSchema);