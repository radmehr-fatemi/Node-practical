const { default: mongoose } = require("mongoose");

try {
const BASE_URL = "mongodb://0.0.0.0:27017/practice-mongoose";
const url = "mongodb://0.0.0.0:27017/authentication-p1";

    mongoose.connect(url).then((err) => {
        // if (err) return console.log(console.log("Error in mongoose connection" ));
        console.log("Connected to MongoDB");
    })
    
} catch (err) {
    console.log("Error in mongoose connection" ,err);
    new Error("Error in mongoose connection");
}