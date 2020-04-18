# Node.js Interactive RestAPI Boilerplate 

![](src/modules/assets/images/codegeekchef.png)

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Scripts](#scripts)

-----------------------------------------

## Features
* MVC pattern structure
* Microservice architectural application 
* Stateless Authentication
* Configured with multiple databases (Postgres, Mongo, Redis)
* Elasticsearch connectivity
* Glob controlled Routes and Controllers
* Public and Private Route Handlers
* Activity Logs Monitoring
* IP Request Limiter
* Secure Express HTTP Headers
* Mongo sanitization
* XSS sanitization
* Prevent parameter pollutions
* Precommit git hooks
* File and console bind loggers

## Prerequisites
* Node.js 13+ (refer .npmrc to get exact version)
* Postgresql
* MongoDB
* Redis
* Elasticsearch (includes JDK)
* Private and Public Keys

## Project Structure

| Name                                           | Description                                                            |
| ---------------------------------------------- | ---------------------------------------------------------------------- |
| **logger**/development.log                     | File Loggers depends up on environment                                 |
| **src**/**_\_mocks\_\_**                       | Mock data directory                                                    |
| **src**/**_\_tests\_\_**                       | Test scripts directory                                                 |
| **src**/**config**/config.development.js       | Development configurations file                                        |
| **src**/**config**/config.production.js        | Production configurations file                                         |
| **src**/**config**/config.test.js              | Test configurations file                                               |
| **src**/**config**/index.js                    | Configuration File Handler                                             |
| **src**/**controllers**/authentication         | Authentication Controller Directory                                |
| **src**/**controllers**/users                  | Users Controller Directory                                             |
| **src**/**controllers**/index.js               | All Controllers File Handler                                           |
| **src**/**databases**/mongo                    | Mongo Database Directory ( includes migrations, models and seeders )   |
| **src**/**databases**/postgres                 | Postgres Database Directory ( includes migrations, models and seeders )|
| **src**/**databases**/redis                    | Redis Database Directory                                               |
| **src**/**drivers**/elasticsearch.driver.js    | Elasticsearch driver connection                                        |
| **src**/**drivers**/mongoose.driver.js         | Mongoose driver connection                                             |
| **src**/**drivers**/redis.driver.js            | Redis driver connection                                                |
| **src**/**drivers**/sequelize.driver.js        | Sequelize driver connection                                            |
| **src**/**drivers**/index.js                   | Driver connection Handler                                              |
| **src**/**keys**/jwt/private.pem               | JWT Private key file                                                   |
| **src**/**keys**/jwt/public.pem                | JWT Public key file                                                    |
| **src**/**middlewares**/activityLogs.js        | Activity Logs Middleware                                               |
| **src**/**middlewares**/privateRoute.js        | Private Route Middleware                                               |
| **src**/**middlewares**/index.js               | Middleware Route Handler                                               |
| **src**/**modules**/assets                     | Assets Module Directory                                                |
| **src**/**modules**/locales                    | Locales Module Directory                                               |
| **src**/**modules**/templates                  | Templates Module Directory                                             |
| **src**/**routes**/api/v1/authentication       | API Version-1 Authentication Routes Directory                          |
| **src**/**routes**/api/v1/users                | API Version-1 Users Routes Directory                                   |
| **src**/**routes**/api/index                   | All Routes File Handler with API Version Handler                       |
| **src**/**scripts**/deployment/deployment.sh   | Deployment scripts                                                     |
| **src**/**services**/bcrypt                    | Bcrypt Services Directory                                              |
| **src**/**services**/jwt                       | JWT Services Directory                                                 |
| **src**/**services**/logger                    | Logger Services Directory                                              |
| **src**/**utils**/error                        | Error Utils Directory                                                  |
| **src**/**utils**/validator                    | Validator Utils Directory                                              |
| **src**/index.js                               | Express Application Booter File                                        |
| .babelrc                                       | Babel Preset File                                                      |
| .env.development                               | Development Environment Data File                                      |
| .env.production                                | Production Environment Data File                                       |
| .env.test                                      | Test Environment Data File                                             |
| .eslintrc.json                                 | ESLint Rules                                                           |
| .gitignore                                     | Folder and Files to be ignored by git                                  |
| .huskyrc                                       | Git Husky hooks file                                                   |
| .lintstagedrc                                  | Precommit Git lint-staged file                                         |
| .nvmrc                                         | Node Version Manager file                                              |
| .prettierrc.json                               | Prettier Configuration file                                            |
| .sequelizerc                                   | Sequelize Configuration file                                           |
| package.json                                   | Node Package File                                                      |
| server.js                                      | Node Server Booter File                                                |


## Getting Started

### 1. Get the latest clone
```git clone https://github.com/Mallaiya/node-restapi-boilerplate.git```

### 2. Change directory
```cd node-restapi-boilerplate```

### 3. Install NPM dependencies
```npm install```

### 4. Configurations
* Go to config file and config all needed configuration setups
* Use necessary keys in proper `.env` file

### 5. Generate Keys
Generate necessary private and public keys with passphrase for the project using following comment\
```openssl genrsa -out src/keys/jwt/private.pem -aes256 4096```\
```openssl rsa -pubout -in src/keys/jwt/private.pem -out src/keys/jwt/public.pem ```

### 6. Then simply start your development server
```npm run dev```

## Scripts

This boilerplate includes following npm scripts to work, you will run with ` npm run <script name> ` or ` yarn run <script name> `
*  `dev`: Run the application in development mode
*  `start`: Run the application in production mode
*  `test`: Run the application in testing mode
*  `lint`: Run to find lint issues
*  `lint:fix`: Run to fix fixable lint issue

### License & copyrights
Copyright (c) 2020 Mallaiya M\
Licensed under the [MIT License](LICENSE)

