const products = require("../data/products.json");
const fs = require("fs");

async function find() {
    return new Promise((resolve, reject) => {
        resolve(products)
    })
}

async function findById(id) {
    return new Promise(async resolve => {
        const product = await products.find(i => i.id === id);
        resolve(product)
    })
}

async function create(data) {
    return new Promise(async (resolve, reject) => {
        await products.push(data);
        fs.writeFile(`${process.cwd()}/data/products.json`, JSON.stringify(products), (err) => {
            if (err) {
                console.log("Error---------", err);
                reject(err)
            }
            resolve({ massage: "product created" })
        })
    })
}

async function DELETE(id) {
    return new Promise(async (resolve, reject) => {
        const newProducts = products.filter(product => product.id !== id);
        fs.writeFile(`${process.cwd()}/data/products.json`, JSON.stringify(newProducts), (err) => {
            if (err) {
                console.log("Error---------", err);
                reject(err)
            } else {
                resolve({ massage: "product Deleted" })
            }
        })
    })
}

async function update(id, payload) {
    return new Promise(async (resolve, reject) => {
        products.map(product => {
            if (product.id === id) {
                Object.assign(product, payload)
            }
            return products
        })
        fs.writeFile(`${process.cwd()}/data/products.json`, JSON.stringify(products), (err) => {
            if (err) {
                console.log("Error---------", err);
                reject(err)
            }
            resolve({ massage: "product edited" })
        })
    })
}

const ProductsModel = {
    find,
    findById,
    create,
    update,
    DELETE,
};

module.exports = ProductsModel;