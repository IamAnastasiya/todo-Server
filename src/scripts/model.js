"use strict";

import {EventEmitter} from "./eventEmitter";

export class Model extends EventEmitter {
    constructor() {
        super();
        this.todoItems = [];
    }

    addTodo(item) {
        if (item !== "") {
            const todo = {
                id: Math.random(),
                name: item,
                completed: false,
            };
            this.todoItems.push(todo);
            this.emit('itemAdded', item);
        }
    }

    toggleCheckTodo(id) {
        this.todoItems.forEach(function (item) {
            if (item.id == id) {
                item.completed = !item.completed;
            }
        });
        this.emit('itemChecked');
    }

    removeTodo(id) {
        this.todoItems = this.todoItems.filter(function (item) {
            return item.id != id;
        });
        this.emit('itemRemoved');
    }

    editTodo(id, updatedText) {
        this.todoItems = this.todoItems.map((todo) =>
            todo.id == id ? {id: todo.id, name: updatedText, completed: false} : todo,
        );
        this.emit('itemEdited');
    }

    setTodoId (elem) {
        this.todoItems.forEach(function(item) {
            if (elem.dataset.name == item.name) {
                elem.setAttribute('data-key', item.id);
            }
        });
    }
}