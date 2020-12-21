import '../styles/index.scss';
import {View} from "./view";
import {Model} from "./model";
import {Controller} from "./controller";

if (process.env.NODE_ENV === 'development') {
  require('../index.html');
}


let model = new Model();
let view = new View(model);
const myTodoList = new Controller(model, view);
myTodoList.addItem();
myTodoList.deleteItem();
myTodoList.toggleItem();
myTodoList.editItem();


