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


    createTodoItems () {

        let newTask = this.createElement("div", "list-item");
        this.inputWrapper.append(newTask);

        newTask.setAttribute('data-name', `${this.input.value}`);
        this.model.setTodoId(newTask);

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