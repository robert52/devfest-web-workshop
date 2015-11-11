# DevFest Romania Web Workshop

DevFest 2015 Web tire workshop about Angular, Node.js, and micro-services

# Getting started

Clone the GitHub repo

```bash
$ git clone https://github.com/robert52/devfest-web-workshop.git
```

Install necessary dependencies for each project using `npm`

```bash
$ npm install
```

Copy `example` configuration file and modify for the appropriate environment

```bash
$ cp config/environments/example.js config/environments/development.js
```

# Included projects

```text
api-gateway/      <-- The main API server
auth-service/     <-- Micro-service that handles authentication
client-service/   <-- Client micro-service Not implemented
ui-server/        <-- Static file serving, mainly the Angular app
user-service/     <-- Base micro-service that stores data
```

# Speakers

- [Paul Brie](https://github.com/paulbrie)
- [Robert Onodi](https://github.com/robert52)

# License

[MIT](https://github.com/robert52/devfest-web-workshop/blob/master/LICENSE)
