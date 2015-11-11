'use strict';

module.exports = {
  name: 'user-service',
  port: 3031,
  hostname: '127.0.0.1',
  db: {
    client: 'sqlite3',
    connection: {
      filename: "./db/user_service_db.sqlite"
    }
  }
};
