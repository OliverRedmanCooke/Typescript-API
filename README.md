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

Then use docker-compose to spin up a MongoDB database

```shell
docker-compose up
```

Then you will need to setup your `.env` file, there is a `.env-example` in the repo that you can use

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

To run the api in production mode, open another terminal and run: 

```shell
npm run prod
```

### Todo

- [ ] Add route to edit tasks