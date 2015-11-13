'use strict';

module.exports = {
  name: 'auth-service',
  port: 3033,
  hostname: '127.0.0.1',
  db: {
    client: 'sqlite3',
    connection: {
      filename: "./db/auth_service_db.sqlite"
    }
  }
};
