const { Schema, model, models } = require("mongoose");

const UserSchema = new Schema({
    username: { type: String, required: true, unique: true },
    fulName: { type: String, required: true },
    password: { type: String, required: true },
})

const UserModel = models.user2 || new model("user2", UserSchema);

module.exports = UserModel;