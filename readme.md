# Task Manager API - Node.js

## Table of Contents

- [Overview](#overview)
    - [Features](#features)
    - [Requirements](#requirements)
    - [Usage](#usage)
- [Routes](#routes)
    - [Endpoints](#endpoints)
- [Database](#database)
- [Middlewares](#middlewares)
    - [JSON](#json)
    - [CSV](#csv)
- [Utils](#utils)
    - [Build route path](#build-route-path)

## Overview

A Node.js implemented API for managing tasks with a local database. Furthermore, tasks saved in CSV files can be imported using this API.

### Features

- Create a task
- List all tasks
- Update task by `id`
- Delete task by `id`
- Mark a task as complete by `id`
- Tasks import from a CSV file

### Requirements

For this project, the following (essential for execution) resources were used:
 - [Node.js](https://nodejs.org/)
 - [csv-parse](https://csv.js.org/parse/)

### Usage

First, install the dependencies

```
npm install
```
And then run server:

```
npm run dev
```

## Routes

Routes are found in [src/routes.js](src/routes.js) and return an array with all routes. Each item being an object that has route parameters:

- **Method**: request method
- **Path**: endpoint
- **Handler**: route function

If a route exists in [Routes](src/routes.js), the [Server](src/server.js) will call it.

### Endpoints

- **GET** - `/tasks`: **Select all** tasks.
- **POST** - `/tasks`: **Create** a new task.
    - The request body contains JSON formatted data.
- **PUT** - `/tasks/:id`: **Update** task by id.
    - The request body contains JSON formatted data.
- **PATCH** - `/tasks/:id/complete`: Mark a task as complete by id.
- **DELETE** - `/tasks/:id`: **Delete** task by id.

## Database

The database for this project stores in a JSON file (src/db.json), and [src/middlewares/database.js](src/middlewares/database.js) implements database operations. Every task in this project is composed of the following attributes: 

- `id`: Task identifier.
- `title`: Task title.
- `description`: Task description.
- `completed_at`: Task completion date.
- `created_at`: Creation date.
- `updated_at`: Update date.

Databases are stored in JSON format, with each item representing a table and each table representing an array of logs.

Example:

```
{
    "table": [
        {
            "id": "bef65061-0776-4680-a3a3-e4c437dfacae",
            "title": "Test title",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam ac mi consequat, consequat metus sit amet, aliquam massa.",
            "completed_at": "2024-09-25T15:18:21.831Z",
            "created_at": "2024-09-24T20:20:25.577Z",
            "updated_at": null
        }
    ]
}
```

## Middlewares

### JSON

The creation of JSON middleware takes place in [src/middlewares/json.js](src/middlewares/json.js), where `request` and `response` are received and modified appropriately.

- **Request**: Get the data given in the request body to set `request.body`.  
- **Response**: Set up the request responses in JSON format.

### CSV

This middleware uses streams and the `csv-parse` dependency to import tasks from a CSV file. In order to read CSV, you must store `task.csv` in the format shown below in [csv/tasks.csv](csv/tasks.csv):

| TITLE     | DESCRIPTION         |
|-----------| :-----------------: |
| Task 01   | Description task 01 | 
| Task 02   | Description task 02 |
| Task 03   | Description task 03 |

There will be a `POST` request to create a task sent for every CSV record. A `GET` request to the `/tasks` endpoint will cause the CSV file to be imported.

## Utils

### Build route path

Finding the parameters route using RegEx, returning arguments from URL groups if there are any route parameters. The parameters are obtained by the server, which then verifies and stores them on `request.params` if they are valid.


