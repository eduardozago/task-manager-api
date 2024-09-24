# Task Manager API - Node.js

## Table of Contents
- [Overview](#overview)
    - [Requirements](#requirements)
    - [Usage](#run-server)
- [Server](#server)
- [Routes](#routes)
    - [Endpoints](#endpoints)
- [Database](#database)
- [Middlewares](#middlewares)
    - [JSON](#json)
- [Utils](#utils)

## Overview

This Node.js API manage tasks in a database.

### Requirements
For this project, the following (essential for execution) resources were used:
 - [Node.js](https://nodejs.org/)

### Run server

To run server:
```
npm run dev
```

## Server


## Routes

Routes are found in [src/routes.js] and return an array with all routes. Each item being an object that has route parameters:

- **Method**: request method
- **Path**: endpoint
- **Handler**: route function

If a route exists in [Routes](src/routes.js), the [Server](src/server.js) will call it.

### Endpoints

## Database

## Middlewares

### JSON

The creation of JSON middleware takes place in [src/middlewares/json.js](src/middlewares/json.js), where `request` and `response` are received and modified appropriately.

- **Request**: Get the data given in the request body to set `request.body`.  
- **Response**: Set up the request responses in JSON format. 

## Utils