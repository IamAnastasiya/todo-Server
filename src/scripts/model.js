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
                name: item,
                completed: false,
            };
            this.todoItems.push(todo);
            console.log(this.todoItems);
            this.emit('itemAdded', item);
        }
    }

    toggleCheckTodo(id, status) {
        this.todoItems.forEach(function (item) {
            if (item.id == id) {
                item.completed = !item.completed;
                status = item.completed;
            }
        });
        this.emit('itemChecked', [id, status]);
    }

    removeTodo(id) {
        this.todoItems = this.todoItems.filter(function (item) {
            return item.id != id;
        });
        this.emit('itemRemoved', id);
    }

    editTodo(id, updatedText) {
        this.todoItems = this.todoItems.map((todo) =>
            todo.id == id ? {id: todo.id, name: updatedText, completed: false} : todo,
        );
        this.emit('itemEdited', [id, updatedText]);
    }

    getTodoId (elem) {
        this.todoItems.forEach(function(item) {
            if (elem.dataset.name == item.name) {
                elem.setAttribute('data-key', item.id);
            }
        });
    }
}