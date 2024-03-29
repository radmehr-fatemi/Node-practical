const { default: mongoose } = require("mongoose");

const BASE_URL = "mongodb://0.0.0.0:27017/practice-mongoose";

mongoose.connect(BASE_URL)
console.log("Connected to DB");
