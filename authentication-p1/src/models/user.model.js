const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
    fulName: {type: String ,required: true},
    email: {type: String ,required: true ,unique: true},
    password: {type: String ,required: true },
},{
    timestamps: true
}
);

const UserModel = new model("user" ,UserSchema);

module.exports = UserModel;