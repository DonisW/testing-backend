const {Schema, model} = require("mongoose");

const ventaSchema = new Schema ({
    products:{type: string, required: true},
    amount:{type: Number, required: true},
    paymentMethod:{type: String, required: true},
    typeSale:{type: String, required: true},
    date:{type: Date, default: Date.now}
});

module.exports = model("ventas", ventaSchema)