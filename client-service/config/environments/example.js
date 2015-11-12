'use strict';

module.exports = {
  name: 'client-service',
  port: 3031,
  hostname: '127.0.0.1',
  db: {
    client: 'sqlite3',
    connection: {
      filename: "./db/client_service_db.sqlite"
    }
  }
};
