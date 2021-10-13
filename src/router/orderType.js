const router = require("express").Router();
const orderType = require("../models/orderType");
const { body, validationResult } = require("express-validator");

router.get("/orderType", async (req, res) =>{
    const orders = await orderType.find({status: true});
    res.status(200).send({orders:[orders]});
});

router.post("/orderType/addOrder", [

    body("order", "Especifica el nombre")
    .not()
    .isEmpty()
    .isLength({min:1}).withMessage("no puede estar vacio el nombre")

], async(req, res) =>{

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        const validaciones = errors.array()
        res.status(500).send({validaciones: validaciones})
    }else{
        const order = new orderType(req.body);
        await order.save();
        
        res.status(200).send({message: "Tipo de orden agregada"})
    }
});

router.put("/orderType/updateOrder/:id", [
    
    body("order", "Especifica el nombre")
    .not()
    .isEmpty()
    .isLength({min:1}).withMessage("no puede estar vacio el campo del nombre")

], async (req, res) =>{

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        const validaciones = errors.array()
        res.status(500).send({validaciones: validaciones})
    }else{
        const {order} = req.body
        await orderType.findByIdAndUpdate(req.params.id, {order});

        res.status(200).send({message: "Nombre editado"})
    }
});

router.put("/orderType/eliOrder/:id", async (req, res) =>{
    const order = await orderType.findById(req.params.id)
    order.status = false
    order.save()
    res.status(200).send({message: "tipo de orden eliminada"})
});

router.delete("/orderType/deleteOrder/:id", async (req, res) =>{
    await orderType.findByIdAndDelete(req.params.id)

    res.status(200).send({message: "categoria de orden eliminado"});
});


module.exports = router;