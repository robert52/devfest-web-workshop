'use strict';

module.exports = {
  port: 3020,
  host: "127.0.0.1",
  app: {
    name: "ui server"
  },
  services: {
    auth: {
      port: 3032,
      hostname: '127.0.0.1'
    }
  },
  proxy: {
    trust: true
  },
  serveStatic: true
};
