import { Collection, Db, MongoClient } from 'mongodb'

class StorageService {
    client: MongoClient;
    db: Db;
    tails: Tails;
    constructor() {
        const uri = 'mongodb://localhost:27017';
        this.client = new MongoClient(uri);
        this.db = this.client.db('AudioApp');
        this.tails = new Tails(this.db);
    }

    async init() {
        await this.client.connect();
    }

    stop() {
        this.client.close();
    }
}

class Tails {
    collection: Collection;

    constructor(db: Db) {
        this.collection = db.collection('tails');
    }

    async add<T extends { name: string }>({ name }: T): Promise<void> {
        await this.collection.insertOne({ name: name });
    }

    async get() {
        try {
            const documents = await this.collection.find({}, { projection: { _id: 0 }}).toArray();
            console.log(documents);
            return documents;
        } catch (error) {
            console.error(`Error fetching documents from tails:`, error);
            throw error;
        }
    }
}


export default new StorageService();