const { MongoClient } = require("mongodb");

class MongoConnection {
    #DB_URL = "mongodb://0.0.0.0:27017/pcs";
    #db = null;

    async #connect() {
        try {
            const client = new MongoClient(this.#DB_URL);
            const db = client.db();
            return db

        } catch (err) {
            console.log("Error----------", err);
        }
    }

    async Get() {
        try {
            if (this.#db) {
                console.log("DB connection is already on");
                return this.#db
            }
            this.#db = await this.#connect();
            return this.#db

        } catch (err) {
            console.log("Error----------", err);
        }
    }
}

module.exports = MongoConnection;