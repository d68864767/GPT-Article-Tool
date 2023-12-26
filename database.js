```javascript
const { MongoClient } = require('mongodb');

class Database {
    constructor() {
        this.client = new MongoClient(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    }

    async connect() {
        if (!this.client.isConnected()) {
            await this.client.connect();
        }
        this.db = this.client.db(process.env.MONGODB_DB_NAME);
    }

    async disconnect() {
        if (this.client.isConnected()) {
            await this.client.close();
        }
    }

    async addArticle(article) {
        await this.connect();
        const collection = this.db.collection('articles');
        const result = await collection.insertOne(article);
        await this.disconnect();
        return result;
    }
}

module.exports = new Database();
```
