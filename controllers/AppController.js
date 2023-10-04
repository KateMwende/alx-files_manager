import redisClient from '../utils/redis';
import dbClient from '../utils/db';

class AppController {
  static getStatus(_req, res) {
    res
      .status(200)
      .json({ redis: redisClient.isAlive(), db: dbClient.isAlive() });
  }

  static async getStats(_req, res) {
    const numUsers = await dbClient.nbUsers();
    const numFiles = await dbClient.nbFiles();
    res.status(200).json({ users: numUsers, files: numFiles });
  }
}
module.exports = AppController;
