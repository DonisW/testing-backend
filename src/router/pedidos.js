const router = require("express").Router();
const Product = require("../models/product");
const Pedidos = require("../models/pedidos");
const { body, validationResult } = require('express-validator');

router.get("/pedidos", async (req, res) =>{
    const pedidos = await Pedidos.find({status: true});
    res.status(200).send({pedidos:[pedidos]})
});

router.post("/pedidos/addPedidos",
[
    body("orderType", "Especifica el tipo de orden")
    .not()
    .isEmpty(),

    body("product")
    .isMongoId()
    .withMessage("Falto el Id del producto"),

    body("paymentMethod", "Especificar el metedo de pago")
    .not()
    .isEmpty(),

    body("amount", "Especifica el monto de la compra")
    .not()
    .isEmpty()

], async(req, res) =>{

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        const validaciones = errors.array()
        res.status(500).send({validaciones: validaciones})
    }else{
        const pedido = new Pedidos(req.body);
        await pedido.save()
        const product = await Product.findById(req.body.product);
        product.status = false
        product.save()

        res.status(200).send({message: "Pedido agregado"})
    }
});

/*     const pedido = new Pedidos(req.body);   
    const product = await Product.findById(req.body.product);
    product.status = false
    product.save()
    req.body.product = price + amount
    
    await pedido.save();
    res.status(200).send({message: "Pedido creado"}) */


router.put("/pedidos/updatePedidos/:id",
[
    body("orderType", "Especifica el tipo de orden")
    .not()
    .isEmpty(),

    body("product")
    .isMongoId()
    .withMessage("Falto el Id del producto"),

    body("paymentMethod", "Especificar el metedo de pago")
    .not()
    .isEmpty(),

    body("amount", "Especifica el monto de la compra")
    .not()
    .isEmpty()

],async (req, res) =>{

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        const validaciones = errors.array()
        res.status(500).send({validaciones: validaciones});
    }else{
        const update = req.body
        await Pedidos.findByIdAndUpdate(req.params.id, update);

        res.status(200).send({message: "Pedido actualizado"})
    }
/*     const {orderType, product, paymentMethod, amount} = req.body;
    await Pedidos.findByIdAndUpdate(req.params.id, {orderType, product, paymentMethod, amount});
    res.status(200).send({message:" Pedido actualizado"}); */
});

router.put("/pedidos/eliPedidos/:id", async (req, res) =>{
    const pedidos = await Pedidos.findById(req.params.id);
    pedidos.status = false
    pedidos.save()
    res.status(200).send("Pedido Eliminado")
});


module.exports = router;