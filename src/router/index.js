const router = require("express").Router();

router.get("/api", (req, res) =>{
    res.send("<H1>Inicio<H1>");
});

module.exports = router;