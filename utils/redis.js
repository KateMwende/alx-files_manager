import { createClient } from 'redis';
import { promisify } from 'util';

class RedisClient {
  constructor() {
    this.client = createClient();
    this.client.on('error', (error) => {
      console.log(`Redis client not connected to server, ${error}`);
    });
  }

  // check connection
  isAlive() {
    if (this.client.connected) {
      return true;
    }
    return false;
  }

  // returns the Redis value stored for this key
  async get(key) {
    const gets = promisify(this.client.get).bind(this.client);
    const value = await gets(key);
    return value;
  }

  // set key with value in redis
  async set(key, value, time) {
    const sets = promisify(this.client.set).bind(this.client);
    await sets(key, value);
    await this.client.expire(key, time);
  }

  // delete value  of redis key
  async del(key) {
    const dels = promisify(this.client.del).bind(this.client);
    await dels(key);
  }
}

const rediClient = new RedisClient();
module.exports = rediClient;
