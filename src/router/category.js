const router = require("express").Router();
const Product = require("../models/product");
const Category = require("../models/category");
const { body, validationResult } = require('express-validator');

router.get("/categorys", async (req, res) =>{
    const category = await Category.find({status: true});
    res.status(200).send({category:[category]});
});

router.post("/categorys/addCategorys", [

    body("category", "Especifica el nombre")
    .not()
    .isEmpty()
    

], async(req, res) =>{

    const errors = validationResult(req);
     if (!errors.isEmpty()){
     const validaciones = errors.array()
     res.status(500).send({validaciones: validaciones})
    }else{

     const category = new Category(req.body);
     await category.save();
    
     res.status(200).send({message: "Categoria agregada"})
    }
});

router.put("/categorys/updateCategorys/:id", [

    body("category", "Especifica el nombre")
    .not()
    .isEmpty()
    

], async (req, res) =>{

    const errors = validationResult(req);
    if (!errors.isEmpty()){
        const validaciones = errors.array()
        res.status(500).send({validaciones: validaciones})
    }else{
        const {category} = req.body;
        await Category.findByIdAndUpdate(req.params.id, {category});
        
        res.status(200).send({message:" Categoria actualizada"});
    }
});

router.put("/categorys/eliCategorys/:id", async (req, res) =>{
    const category = await Category.findById(req.params.id);
    category.status = false
    category.save()
    res.status(200).send("Categoria Eliminada")
});


module.exports= router;