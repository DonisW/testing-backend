const router = require("express").Router();
const Product = require("../models/product");
const { body, validationResult } = require('express-validator');

router.get("/products", async (req, res) =>{
    const products = await Product.find({status: true})

    res.status(200).send({products})
});

router.get("/products/:id", async (req, res) =>{
    const product = await Product.findById(req.params.id, {status: true})

    res.status(200).send({product})
})

/*router.get("/products/searchProducts", async (req, res) =>{
    const name = Product(req.body)
    const products = await Product.find({status: true, name: req.body.name})

    res.status(200).send(products)
});*/

router.get("/catProducts", async (req, res) =>{
    const category = Product(req.body)
    const products = await Product.find({status: true, category: req.body.category})

    res.status(200).send({category:[products]})
});

router.post("/products/addProducts",
[
    body("category", "Categoria del producto?")
    .isMongoId().withMessage("Id de la categoria"),

    body("name", "Nombre del producto?")
        .isLength({min:2}).withMessage("minimo 2 caracteres para el nombre del producto"),

    body("description", "Falto la descripcion del producto")
        .not()
        .isEmpty(),

    body("model", "Marca o modelo del producto?")
        .not()
        .isEmpty()
        .isLength({min:2}).withMessage("minimo 4 caracteres"),
    
    body("stock", "productos disponibles?")
        .not()
        .isEmpty(),
    
    body("price", "Precio del producto?")
        .not()
        .isEmpty()

], async(req, res) =>{

    const errors = validationResult(req);
    if (!errors.isEmpty()){
        const validaciones = errors.array()
        res.status(500).send({validaciones: validaciones})
    }else{
        const product = new Product(req.body);
        await product.save()

        res.status(200).send({message: "Producto agregado"})
    }
});

router.delete("/products/deleteProducts/:id", async (req, res) =>{
    await Product.findByIdAndDelete(req.params.id)

    res.status(200).send({message: "Producto eliminado"});
});

router.put("/products/updateProducts/:id", [

    body("category", "Categoria del producto?")
    .not()
    .isEmpty()
    .isMongoId().withMessage("Id de la categoria"),

    body("name", "Nombre del producto?")
        .not()
        .isEmpty()
        .isLength({min:2}).withMessage("minimo 4 caracteres para el nombre del producto"),

    body("description", "Falto la descripcion del producto")
        .not()
        .isEmpty(),

    body("model", "Marca o modelo del producto?")
        .not()
        .isEmpty()
        .isLength({min:2}).withMessage("minimo 4 caracteres"),
       
    body("stock", "productos disponibles?")
        .not()
        .isEmpty(),

    body("price", "Precio del producto?")
        .not()
        .isEmpty()

], async (req, res) =>{

    const errors = validationResult(req);
    if (!errors.isEmpty()){
        const validaciones = errors.array()
        res.status(500).send({validaciones: validaciones})
    }else{
        const update = req.body;
        await Product.findByIdAndUpdate(req.params.id, update);

        res.status(200).send({message: "Producto actualizado"});
    }
});

router.put("/products/eliProducts/:id", async (req, res) =>{
    const product = await Product.findById(req.params.id);
    product.status = false
    product.save()
    res.status(200).send("Producto Eliminado")
});

module.exports = router;
