const router = require("express").Router();
const product = require("../models/product");
const Product = require("../models/product");

router.delete("", (req, res) => {
    let productId = req.params.productId

    Product.findById(productId, (err,product) => {
        if (err) res.status(500).send({message: 'Error al eliminar el producto: ${err}'})

        Product.remove(err => {
            if (err) res.status(500).send({message:'Error al eliminar el producto: ${err}'})
            res.status(200).send({message:'El producto ha sido eliminado'})
        })
    })
})


/*router.delete("", async (req, res) =>{
    await Product.findByIdAndDelete(req.params.id);
     res.status(200).send({message: "Producto eliminado"});
})*/

module.exports = router;