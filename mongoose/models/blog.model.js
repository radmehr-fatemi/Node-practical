const { Schema, model, models } = require("mongoose");

const BlogSchema = new Schema({
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, minLength: 12 },
}, {
    timestamps: true
}
);

const BlogModel = new model("blog", BlogSchema, "myBlogs")

module.exports = {
    BlogModel
}