"use strict";

import {api} from "./apiFunc";

export class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        this.updateTodoList();


        view.on('addButtonClicked',  () => this.sendDataToServer(), this.model.addTodo(this.view.input.value));
        view.on('deleteButtonClicked', (elem) => this.model.removeTodo(elem.dataset.key));
        view.on('checkboxClicked', (elem) => this.model.toggleCheckTodo(elem.dataset.key));
        view.on('editButtonClicked', (args) => this.model.editTodo(args[0].dataset.key, args[1]));


        model.on('itemRemoved', (id) => this.deleteDataFromServer(id));
        model.on('itemChecked', (args) => this.updateDataOnServer(args[0], args[1]));
        model.on('itemEdited', (args) => this.editDataOnServer(args[0], args[1]));
    }

    updateTodoList = () => {
        api('http://localhost:8081/todos', {
            method: 'GET',
        })
            .then(data => {
            this.model.todoItems.push(...data);
            console.log(this.model.todoItems);
            this.onTodoListChanged(this.model.todoItems);
        });
    }

    onTodoListChanged = () => {
        this.view.displayTodos();
    }

    sendDataToServer = () => {
        api('http://localhost:8081/todos', {
            method: 'POST',
            body: { name: this.view.input.value, completed: false},
        })
            .then(data => {
                this.model.todoItems.push(data);
                console.log(this.model.todoItems);
            });
    }

    deleteDataFromServer = (id) => {
        api(`http://localhost:8081/todos/${id}`, {
            method: 'DELETE',
        })
            .then(res => console.log("item deleted"));
    }

    updateDataOnServer = (id, status) => {
        api(`http://localhost:8081/todos/${id}`, {
        method: 'PUT',
        body: { id: id, completed: status },
        })
        .then(data => {
            console.log(data);
        });
    }

    editDataOnServer = (id, updatedText) => {
        api(`http://localhost:8081/todos/${id}`, {
        method: 'PUT',
        body: { id: id, name: updatedText,},
        })
        .then(data => {
            console.log(data);
        });
    }


    addItem = () => {
        this.view.handleAddTodo();
    }

    deleteItem = () => {
        this.view.handleDeleteTodo();
    }

    toggleItem = () => {
        this.view.handleToggleTodo();
    }

    editItem = () => {
        this.view.handleEditTodo();
    }


}