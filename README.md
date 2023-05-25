# TypeScript API Server

API that will allow you to create tasks using TypeScript, Mongoose, MongoDB and Express.
## Local development

### Pre-requisites

-   Docker installed
-   Node.js installed

### Running locally

First install the node_modules

```shell
npm i
```

To run locally run this command, it will spin up a MongoDB database

```shell
docker-compose up
```

To run the api in development mode, open another terminal and run: 

```shell
npm run dev
```

Once running, the api documentation can be found [here](http://localhost:3501/api-documentation)

To the test suites, use the following command: 

```shell
npm run test
```

To run the linting and fix any issues, you can run: 

```shell
npm run lint:fix
```