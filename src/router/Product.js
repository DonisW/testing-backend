const router = require("express").Router();
const Product = require("../models/product");

router.get("/products", async (req, res) =>{
    const products = await Product.find({status: true});
    res.status(200).send({products:[products]})
});

router.post("/products/addProducts", async(req, res) =>{
    const product = new Product(req.body);
    await product.save();
    res.status(200).send({message: "Producto agregado"})
});

router.delete("/products/deleteProducts/:id", async (req, res) =>{
    await Product.findByIdAndDelete(req.params.id);
     res.status(200).send({message: "Producto eliminado"});
});

router.put("/products/updateProducts/:id", async (req, res) =>{
    const {name,color,model} = req.body;
    await Product.findByIdAndUpdate(req.params.id, {name,color,model});
    res.status(200).send({message:" Producto actualizado"});
});

router.put("/products/eliProducts/:id", async (req, res) =>{
    const product = await Product.findById(req.params.id);
    product.status = false
    product.save()
    res.status(200).send("Producto Eliminado")
});

module.exports = router;