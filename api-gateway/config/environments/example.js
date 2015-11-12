'use strict';

module.exports = {
  port: 3010,
  host: "127.0.0.1",
  app: {
    name: "api gateway"
  },
  services: {
    user: {
      port: 3030,
      hostname: '127.0.0.1'
    },
    client: {
      port: 3031,
      hostname: '127.0.0.1'
    },
    auth: {
      port: 3032,
      hostname: '127.0.0.1'
    }
  },
  cors: true
};
