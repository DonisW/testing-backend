const {Schema, model} = require("mongoose");

const reportSchema = new Schema ({
    salesDiary:{type: Number, required: true},
    quantityProduct:{type: Number, required: true},
    amountDiary:{type: Number, required: true},
    paymentMethod:{type: String, required: true},
    typeSale:{type: String, required: true},
    date:{type: Date, default: Date.now}
});

module.exports = model("reporte", reportSchema)