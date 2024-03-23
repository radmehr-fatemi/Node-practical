const productsModel = require("../model/productsModel");

async function get(res) {
    try {
        const products = await productsModel.find();
        res.writeHead(200, { "Content-Type": "Application/json" }),
            res.write(JSON.stringify(products))
        res.end();

    } catch (err) {
        console.log("Error in get products", err)
        res.writeHead(500, { "Content-Type": "Application/json" }),
            res.write(JSON.stringify({ error: "server error" }))
        res.end();
    }
}

async function getById(req, res) {
    try {
        const [, , id] = req.url.split("/");
        const product = await productsModel.findById(id)
        res.writeHead(200, { "Content-Type": "Application/json" })

        if (!product) {
            const massage = { massage: "No product", status: 404 };
            res.write(JSON.stringify(massage))
            res.end()
        } else {
            res.write(JSON.stringify(product))
            res.end()
        }

    } catch (err) {
        console.log("Error in get product", err)
        res.writeHead(500, { "Content-Type": "Application/json" }),
            res.write(JSON.stringify({ error: "server error" }))
        res.end();
    }
}

async function createProduct(req, res) {
    try {
        let body = "";
        req.on("data", chunk => body += chunk.toString())

        req.on("end", async () => {
            const product = { id: `22${(Math.random() * 1000).toFixed()}`, ...JSON.parse(body) }
            const created = await productsModel.create(product)
            res.writeHead(201, { "Content-Type": "Application/json" })
            res.write(JSON.stringify({ product, massage: created.massage }))
            res.end()
        })

    } catch (err) {
        console.log("Error in create product", err)
        res.writeHead(500, { "Content-Type": "Application/json" }),
            res.write(JSON.stringify({ error: "server error" }))
        res.end();
    }
}

async function updateProduct(req, res) {
    try {
        let body = "";
        req.on("data", chunk => body += chunk.toString());

        req.on("end", async () => {
            const [, , id] = req.url.split("/");
            const product = JSON.parse(body);
            const existing = await productsModel.findById(id);

            res.writeHead(201, { "Content-Type": "Application/json" })

            if (!existing) {
                res.write(JSON.stringify({ massage: "Product not found" }))
                res.end()
                return
            }

            const updated = await productsModel.update(id ,product);
            res.write(JSON.stringify({ product, massage: updated.massage }))
            res.end()
        })

    } catch (err) {
        console.log("Error in update product", err)
        res.writeHead(500, { "Content-Type": "Application/json" }),
            res.write(JSON.stringify({ error: "server error" }))
        res.end();
    }
}

async function deleteProduct(req, res) {
    try {
        let body = "";
        req.on("data", chunk => body += chunk.toString());

        req.on("end", async () => {
            const [, , id] = req.url.split("/");
            const existing = await productsModel.findById(id);

            res.writeHead(201, { "Content-Type": "Application/json" })

            if (!existing) {
                res.write(JSON.stringify({ massage: "Product not found" }))
                res.end()
                return
            }

            const deleted = await productsModel.DELETE(id);
            res.write(JSON.stringify({ massage: deleted.massage }))
            res.end()
        })

    } catch (err) {
        console.log("Error in deleted product", err)
        res.writeHead(500, { "Content-Type": "Application/json" }),
            res.write(JSON.stringify({ error: "server error" }))
        res.end();
    }
}


const ProductsController = {
    get,
    getById,
    createProduct,
    updateProduct,
    deleteProduct,
};

module.exports = ProductsController;