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
app.use(require("./router/index"));
app.use(require("./router/Product"));
app.use(require("./router/pedidos"));
app.use(require("./router/category"));
app.use(require("./router/orderType"));

//Server Listening
app.listen(app.get("port"), () =>{
    console.log(`Server on port ${app.get("port")}`);
})