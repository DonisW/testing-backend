let mongoose = require("mongoose");

const db = mongoose.connection;
const uri = "mongodb://localhost:27017/testDonis";

mongoose.connect(uri,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})

db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", function() {
    console.log("DataBase Conectada", uri)
});