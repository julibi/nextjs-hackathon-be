# BE for Next.js Hackathon

This is a barebone wip BE for our Hackathon. It is an endpoint for our todo list app. Feel free to clone, add and change as much as you like.

# Getting started

Prerequisites: docker daemon installed and running. `npm i` executed from root of project. Make sure you have a valid `.env`-file

This is a Nest.js app with a dockerized mysql database.

To start the database, run: `docker-compose -f docker-compose.yml up`

Then, to start the app, run: `npm run start:dev`

Whenever making a request, make sure the header has an api key set like this: `'api-key': 'API_KEY from .env'`

# Endpoint

The endpoint lets you create, update, get and delete todos. The todo entity looks like this:

```
  id: number;
  title: string;
  category?: 'CHORE' | 'WORK' | 'OTHER';
  isCompleted?: boolean;
```

## GET /todos

- returns array of all todos e.g.:

[
{
"id": 1,
"title": "semin bday present",
"category": "CHORE",
"isCompleted": false
},
{
"id": 2,
"title": "organize meeting",
"category": "WORK",
"isCompleted": true
}
]

## GET /todos/:id

- returns todo with id

## GET /top

- returns top todos (max 3)
- CAUTION, this endpoint is very slow on purpose

## GET /todos?isCompleted=true

- returns only completed todos
- this is the only query param accepted, unfortunately :D

## POST /todos

- creates a todo
- json body of request needs values for `title` and `category`
- on creation `isCompleted` is set to false by default, unless you actively specify inside request body

## POST /todos/bulk-create

- same as creating a single todo, just pass an array of objects

## PATCH /todos/:id

- updates a todo
- updates only the value given in the request body

## DELETE /todos/:id

- deletes a todo
- no request body required
