"use strict";

import {EventEmitter} from "./eventEmitter";

export class View extends EventEmitter{
    constructor(model) {
        super();
        this.inputWrapper = document.querySelector('.input-wrapper');
        this.input = document.querySelector('.input');
        this.model = model;
    }

    createElement(tag, className) {
        let element = document.createElement(tag);
        if (className) element.classList.add(className);
        return element;
    }

    displayTodos = () => {
        if (this.model.todoItems.length > 0) {
            this.model.todoItems.forEach(function (todo) {
                let inputWrapper = document.querySelector('.input-wrapper');
                let task = document.createElement("div");
                task.classList.add("list-item");
                inputWrapper.append(task);
                task.id = todo.id;
                task.setAttribute('data-key', todo.id);

                let text = document.createElement("input");
                text.classList.add("text-item");
                text.setAttribute("readonly", true);
                text.value = todo.name;
                task.append(text);

                let radio = document.createElement("input");
                radio.classList.add("checkbox");
                radio.setAttribute('type', 'checkbox');
                task.prepend(radio);
                if (todo.completed === true) {
                    radio.checked = true;
                    text.classList.add("checked");
                }

                let deleteBtn = document.createElement("button");
                deleteBtn.classList.add("delete-button");
                deleteBtn.innerHTML = "x";
                task.append(deleteBtn);
            });
        }
    }


    createTodoItems () {

        let newTask = this.createElement("div", "list-item");
        this.inputWrapper.append(newTask);

        newTask.setAttribute('data-name', `${this.input.value}`);

        let textLine = this.createElement("input", "text-item");
        textLine.setAttribute("readonly", true);
        textLine.value = this.input.value;
        newTask.append(textLine);

        let inputRadio = this.createElement("input", "checkbox");
        inputRadio.setAttribute('type', 'checkbox');
        newTask.prepend(inputRadio);

        let deleteButton = this.createElement("button", "delete-button");
        deleteButton.innerHTML = "x";
        newTask.append(deleteButton);
    }

    handleAddTodo () {
        this.input.addEventListener("keydown", event => {
            if (event.keyCode === 13 && this.input.value !== "") {
                this.emit('addButtonClicked');
                this.createTodoItems();
                this.input.value = "";
            }
        });
    }

    handleEditTodo() {
        let saveButton;
        let textLine;

        this.inputWrapper.addEventListener("dblclick", event => {
            if (event.target.className !== "checkbox" && event.target.className !== "delete-button") {
                let elem = event.target.closest('div');
                textLine = elem.childNodes[1];
                textLine.removeAttribute("readonly", true);
                this.model.getTodoId(elem);

                saveButton = this.createElement("button", "save-button");
                saveButton.innerHTML = "SAVE";
                elem.append(saveButton);
            }
        });
        this.inputWrapper.addEventListener("click", event => {
            if (event.target.className === "save-button") {
                let elem = event.target.closest('div');
                let updatedText = textLine.value;
                textLine.setAttribute("readonly", true);
                event.target.style.display = "none";
                this.emit('editButtonClicked', [elem, updatedText]);
                return updatedText;
            }

        });
    }

    handleDeleteTodo () {
        this.inputWrapper.addEventListener("click", event => {
            if (event.target.className === "delete-button") {

                let elem = event.target.closest('div');
                this.model.getTodoId(elem);
                let inputRadio = elem.firstChild;
                if (inputRadio.checked) {
                    elem.remove();
                    this.emit('deleteButtonClicked', elem);
                }
            }
        });
    }

    handleToggleTodo () {
        this.inputWrapper.addEventListener("click", event => {
            if (event.target.className === "checkbox") {
                let elem = event.target.closest('div');
                this.model.getTodoId(elem);
                this.emit('checkboxClicked', elem);
                let inputRadio = elem.firstChild;
                let textLine = elem.childNodes[1];

                if (inputRadio.checked) {
                    textLine.classList.add("checked");
                } else {
                    textLine.classList.remove("checked");
                }

            }
        });
    }
}