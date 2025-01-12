# Quantum Motors Configurator API

## Description

This project is a web application that provides a configurator for managing car configuration. The application is built with Node.js, Express, and Prisma.

This repository contains API.

## Features

- CRUD model, finish, color, car combination
- Make a configuration

## Installation && Run

Before you start, make sure you have Node.js v20, yarn "berry" and MySQL/MariDB Server installed on your machine.

#### Set berry version of yarn

`yarn set version berry`

### Import quantum-motors-initial.sql file to your database

#### Create a .env.dev file based on .env example on this repository

This is all environments variables

- DATABASE_URL : The database dsn => example : "mysql://user:@localhost:3306/quantum-motors?schema=public"

* PORT: Application port, by default is 3000
* ADMIN_PASSWORD: Admin password for CREATE, UPDATE and DELETE Htp operation => example : azerty
* CAR_SERVICE_IMAGE_URL : The URLs of image service for all configuration : example => "http://localhost:3000"
* CORS_ORIGIN: Allowed domain to your api

#### Install the dependencies:

`yarn install`

#### Usage

To start the server with dev environment, run:

`yarn dev`

The server will start on http://localhost:3000.

#### Testing

To run the unit tests, create a .env.test file with the database URL for test and run this command :

`yarn test`

#### Lint

To run the linter :

`yarn lint`

### Prepare production

To publish your application to production, here are the instructions :

- Fill the .env file with `NODE_ENV=production`
- To compile : `yarn build`
- And start : `yarn start`

### Contributing

Contributions are welcome! Please read the contributing guidelines first.
