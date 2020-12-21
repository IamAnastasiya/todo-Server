"use strict";

export class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;


        this.updateTodoList ()
            .then(data => {
                this.model.todoItems.push(...data);
                console.log(this.model.todoItems);
                this.onTodoListChanged(this.model.todoItems);
            });

        view.on('addButtonClicked',  () => this.sendDataToServer(), this.model.addTodo(this.view.input.value));
        view.on('deleteButtonClicked', (elem) => this.model.removeTodo(elem.dataset.key));
        view.on('checkboxClicked', (elem) => this.model.toggleCheckTodo(elem.dataset.key));
        view.on('editButtonClicked', (args) => this.model.editTodo(args[0].dataset.key, args[1]));


        model.on('itemRemoved', (id) => this.deleteDataFromServer(id));
        model.on('itemChecked', (args) => this.updateDataOnServer(args[0], args[1]));
        model.on('itemEdited', (args) => this.editDataOnServer(args[0], args[1]));
    }

    updateTodoList () {
        return fetch('http://localhost:8081/todos')
            .then(res => res.json())
            .then(data => {
                return data;
            })
            .catch(err => {
                console.log(err);
            });
    }

    onTodoListChanged = () => {
        this.view.displayTodos();
    }

    api (url, {headers, body, ...params}) {
        const paramsToSend = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                // ...headers
            },
            body: body ? JSON.stringify(body): undefined,
            ...params,
        };
        return fetch(url, paramsToSend)
            .then(res => res.json());
    }

    sendDataToServer = () => {
        this.api('http://localhost:8081/todos', {
            method: 'POST',
            body: { name: this.view.input.value, completed: false},
        })
            .then(data => {
                this.model.todoItems.push(data);
                console.log(this.model.todoItems);
            });
    }

    deleteDataFromServer = (id) => {
        fetch(`http://localhost:8081/todos/${id}`, {
            method: 'DELETE',
        })
            .then(res => console.log("item deleted"));
    }

    updateDataOnServer = (id, status) => {
        this.api(`http://localhost:8081/todos/${id}`, {
        method: 'PUT',
        body: { id: id, completed: status },
        })
        .then(data => {
            console.log(data);
        });
    }

    editDataOnServer = (id, updatedText) => {
        this.api(`http://localhost:8081/todos/${id}`, {
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