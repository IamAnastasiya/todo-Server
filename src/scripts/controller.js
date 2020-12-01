"use strict";

export class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        view.on('addButtonClicked',  () => this.model.addTodo(this.view.input.value));
        view.on('deleteButtonClicked', (elem) => this.model.removeTodo(elem.dataset.key));
        view.on('checkboxClicked', (elem) => this.model.toggleCheckTodo(elem.dataset.key));
        view.on('editButtonClicked', (args) => this.model.editTodo(args[0].dataset.key, args[1]));

        model.on('itemAdded', () => this.showUpdatedData());
        model.on('itemRemoved', () => this.showUpdatedData());
        model.on('itemChecked', () => this.showUpdatedData());
        model.on('itemEdited', () => this.showUpdatedData());
    }

    showUpdatedData () {
        console.log (this.model.todoItems);
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