const MongoConnection = require("../utils/connection/mongoConnection");
const { ObjectId } = require("mongodb");
const productCollectionName = "product";

async function find() {
    return new Promise(async (resolve, reject) => {
        const db = await new MongoConnection().Get();
        const products = await db.collection(productCollectionName).find().toArray()
        resolve(products)
    })
}

async function findById(id) {
    return new Promise(async (resolve) => {
        const db = await new MongoConnection().Get();
        const product = await db.collection(productCollectionName).findOne({ _id: new ObjectId(id) });
        resolve(product)
    })
}

async function create(data) {
    return new Promise(async (resolve, reject) => {
        const db = await new MongoConnection().Get();
        const result = await db.collection(productCollectionName).insertOne(data)
        resolve(result)
    })
}

async function DELETE(id) {
    return new Promise(async (resolve, reject) => {
        const db = await new MongoConnection().Get();
        const result = await db.collection(productCollectionName).deleteOne({ _id: new ObjectId(id) });
        resolve(result)
    })
}

async function update(id, payload) {
    return new Promise(async (resolve, reject) => {

        const db = await new MongoConnection().Get();
        const result = await db.collection(productCollectionName).updateOne({ _id: id }, { $set: {...payload} });

        resolve(result)
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