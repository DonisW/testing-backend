let express = require("express");
const {json} = require("express");
const app = express();

//Settings
require("./db")
app.set("port", process.env.PORT || 3000);

//Middlewares
app.use(express.urlencoded({extended:false}));
app.use(express.json());

//Router
app.use("/api/", require("./router/index"));
app.use("/api/addproduct", require("./router/addProduct"));
app.use("/api/products", require("./router/products"));

//Server Listening
app.listen(app.get("port"), () =>{
    console.log(`Server on port ${app.get("port")}`);
})