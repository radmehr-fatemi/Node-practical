const { default: mongoose } = require("mongoose");

try {
const url = "mongodb://0.0.0.0:27017/authentication-p1";

    mongoose.connect(url).then((err) => {
        console.log("Connected to MongoDB");
    })
    
} catch (err) {
    console.log("Error in mongoose connection" ,err);
    new Error("Error in mongoose connection");
}