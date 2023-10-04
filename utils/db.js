import { MongoClient } from 'mongodb';

const DATABASE = process.env.DB_DATABASE || 'files_manager';
const HOST = process.env.DB_HOST || 'localhost';
const PORT = process.env.DB_PORT || 27017;

const url = `mongodb://${HOST}:${PORT}`;

class DBClient {
  constructor() {
    this.client = new MongoClient(url);
    this.client
      .connect()
      .then(() => {
        this.db = this.client.db(`${DATABASE}`);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  isAlive() {
    if (this.client.isConnected) {
      return true;
    }
    return false;
  }

  // return number of docs in users collection
  async nbUsers() {
    const users = this.db.collection('users');
    const uDocs = await users.countDocuments();
    return uDocs;
  }

  // return number of docs in files collection
  async nbFiles() {
    const files = this.db.collection('files');
    const fDocs = await files.countDocuments();
    return fDocs;
  }
}

const dbClient = new DBClient();
module.exports = dbClient;
