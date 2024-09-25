# Task Manager API - Node.js

## Table of Contents
- [Overview](#overview)
    - [Features](#features)
    - [Requirements](#requirements)
    - [Usage](#run-server)
- [Server](#server)
- [Routes](#routes)
    - [Endpoints](#endpoints)
- [Database](#database)
- [Middlewares](#middlewares)
    - [JSON](#json)
- [Utils](#utils)
    - [Build route path](#build-route-path)

## Overview

This Node.js API manage tasks in a database.

### Features
- Create a task
- List all task
- Update task by `id`
- Delete task by `id`
- Mark a task as complete by `id`

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

Routes are found in [src/routes.js](src/routes.js) and return an array with all routes. Each item being an object that has route parameters:

- **Method**: request method
- **Path**: endpoint
- **Handler**: route function

If a route exists in [Routes](src/routes.js), the [Server](src/server.js) will call it.

### Endpoints

- **POST** - /tasks: **Create** a new task
- **GET** - /tasks: **Select all** tasks
- **PUT** - /tasks/:id:
- **PATCH** - /tasks/:id/complete:
- **DELETE** - /tasks/:id: 

## Database

The database for this project stores in a JSON file (src/db.json), and [src/middlewares/database.js](src/middlewares/database.js) implements database operations. Every task in this project is composed of the following attributes: 

- `id`: task identifier
- `title`: task title 
- `description`: detailed task description
- `completed_at`: 
- `created_at`: 
- `updated_at`:

Databases are stored in JSON format, with each item representing a table and each table representing an array of logs.

Example:

```
{
    "table": [
        {
            "id": "task id",
            "title": "task title",
            "description": "description task",
            "completed_at": ,
            "created_at": ,
            "updated_at":
        }
    ]
}
```

## Middlewares

### JSON

The creation of JSON middleware takes place in [src/middlewares/json.js](src/middlewares/json.js), where `request` and `response` are received and modified appropriately.

- **Request**: Get the data given in the request body to set `request.body`.  
- **Response**: Set up the request responses in JSON format. 

## Utils

### Build route path

Finding the parameters route using RegEx, returning arguments from URL groups if there are any route parameters. The parameters are obtained by the server, which then verifies and stores them on `request.params` if they are valid.

