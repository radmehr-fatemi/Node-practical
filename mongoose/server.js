const express = require('express');
const { notFoundHandler, errorHandler } = require('./middlewares/error.handler');
const { mongooseConnection } = require('./config/mongoose.config');
const { BlogModel } = require('./models/blog.model');
const omitEmpty = require("omit-empty");
const { isValidObjectId } = require('mongoose');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded());
require("./config/mongoose.config");

app.get("/", (req, res, next) => {
    res.send("Home route")
})

app.get("/blogs", async (req, res, next) => {
    try {
        const blogs = await BlogModel.find();
        res.send(blogs)

    } catch (err) {
        next(err)
    }
})

app.post("/blogs", async (req, res, next) => {
    try {
        const { title, description } = omitEmpty(req.body);
        const blog = new BlogModel({ title, description });
        await blog.save()

        res.send({
            massage: "Blog created",
            status: 201,
            blog
        })

    } catch (err) {
        next(err)
    }
})

app.get("/blogs/:id", async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!isValidObjectId(id)) return res.json({
            massage: "blog not found",
            status: 404
        })

        const blog = await BlogModel.findOne({ _id: id });

        if (!blog) return res.json({
            massage: "blog not found",
            status: 404
        })

        res.send(blog)

    } catch (err) {
        next(err)
    }
})

app.delete("/blogs/:id", async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!isValidObjectId(id)) return res.json({
            massage: "blog has already not found",
            status: 404
        })

        const result = await BlogModel.deleteOne({ _id: id });

        res.send(result)

    } catch (err) {
        next(err)
    }
})

app.put("/blogs/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const newBodyObject = omitEmpty(req.body);

        if (!isValidObjectId(id)) return res.json({
            massage: "blog has already not found",
            status: 404
        })

        const result = await BlogModel.findOneAndUpdate({ _id: id }, { $set: newBodyObject });

        res.send({
            massage: "the blog updated",
            status: 200,
            blog: Object.assign(result, newBodyObject)
        })

    } catch (err) {
        next(err)
    }
})

app.patch("/blogs/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const newBodyObject = omitEmpty(req.body);

        if (!isValidObjectId(id)) return res.json({
            massage: "blog has already not found",
            status: 404
        })

        const blog = await BlogModel.findOne({ _id: id });
        const result = Object.assign(blog, newBodyObject);

        res.send({
            massage: "the blog updated",
            status: 200,
            blog: result
        })

    } catch (err) {
        next(err)
    }
})

app.listen(port, () => console.log(`Server has ran on http://localhost:${port}`))
app.use(notFoundHandler)
app.use(errorHandler)