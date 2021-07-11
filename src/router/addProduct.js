const router = require("express").Router();
const Product = require("../models/product");

router.post("", async(req, res) =>{
    const product = new Product(req.body);
    await product.save();
    res.status(200).send({message: "Producto agregado"})
})

module.exports = router;