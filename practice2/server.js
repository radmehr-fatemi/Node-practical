const http = require("http");
const PORT = 3000;
const ProductsController = require("./controller/productsController");
const ErrorHandlerController = require("./controller/errorHandlerController");

const server = http.createServer((req, res) => {
    const { method, url } = req;
    const BASE_URL = url === "/products";
    const SINGLE_URL = url.match(/\/products\/[0-9]+/);

    switch (method) {
        case "GET":
            if (BASE_URL) return ProductsController.get(res, req);
            if (SINGLE_URL) return ProductsController.getById(req, res);
            else ErrorHandlerController.errorHandler(res);
            break

        case "POST":
            ProductsController.createProduct(req, res)
            break

        case "PUT":
            if (SINGLE_URL) return ProductsController.updateProduct(req, res);
            break

        case "DELETE":
            if (SINGLE_URL) return ProductsController.deleteProduct(req, res);
            break

        default: ErrorHandlerController.errorHandler(res);
    }

});

function logger() {
    console.log(`Ran server on port ${PORT} (http://localhost${PORT})`)
}

server.listen(PORT, logger)