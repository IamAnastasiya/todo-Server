const express = require("express");
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require("fs");

app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cors());

const todos = [];

app.post("/todos", function(request, response){
    const newTodo = { id: `${Math.random()}`, ...request.body };
    todos.push(newTodo);
    response.end(JSON.stringify(newTodo));
});

app.get("/todos/:id", function(request, response) {
    const id = request.params.id;
    const todo = todos.find(todo => todo.id === id);

    if (todo) {
        response.end(JSON.stringify(todo));
    } else {
        response.status(404);
        response.end('Not found');
    }
});

app.delete("/todos/:id", function(request, response){
    const id = request.params.id;
    const todoIndex = todos.findIndex(todo => todo.id === id);

    todos.splice(todoIndex, 1);

    if (todoIndex !== -1) {
        response.end('Success');
    } else {
        response.status(404);
        response.end('Todo not found');
    }
});


app.put("/todos/:id", function(request, response){
    const id = request.body.id;
    const todo = todos.find(todo => todo.id === id);
    Object.assign(todo, request.body);

    response.end(JSON.stringify(todo));
});

app.get("/todos", function(request, response){
    response.end(JSON.stringify(todos));
});

app.listen(8081);