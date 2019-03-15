# Project Name

> Project description

## Related Projects

  - https://github.com/code-voyage/zillowish-sadie
  - https://github.com/code-voyage/zillowish-clifton
  - https://github.com/code-voyage/zillowish-jessica-proxy
  - https://github.com/code-voyage/zillowish-clifton-proxy
  - https://github.com/code-voyage/zillowish-proxy-sadie

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

## Usage

> Some usage instructions

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0
- etc
Create a config.js file that contains your username, password, and database(should be set to zillowgallery).
```sh
let username = 'postgres';
let password = <your password>;
let database = 'zillowgallery'
module.exports ={username, password, database};
```

### Installing Dependencies

From within the root directory:

```sh
npm install -g webpack
npm install knex -g
npm install -g eslint
npm install -g hackreactor-labs/eslint-config-hackreactor
npm install
```

## Development
```sh
npm run react-dev
knex migrate:rollback --env development 
knex migrate:latest --env development
npm run db-seed
npm run node-start
```


