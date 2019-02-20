import { html } from "./html.js";
import { styles } from "./styles.js";
import { UIElement } from "./ui-element.js";
import { todoList, Todo } from "./data.js";
import { TodoElement } from "./todo.js";

export class TodoListElement extends UIElement {
  constructor() {
    super(html`
      ${styles}
      <div><input id="name" /><button id="add-todo">Add</button></div>
      <div id="todo-list"></div>
    `);
  }
  attatchEvents() {
    this.on("click", "#add-todo", (e: MouseEvent) => {
      const input = this.$("#name") as HTMLInputElement;
      const name = input.value;
      input.value = "";
      todoList.add(Todo.create(name));
    });
  }
  subscribe() {
    this.listen("todo-added", ({ id }: any) => {
      const todoElement = new TodoElement();
      todoElement.id = id;
      todoElement.setAttribute("todo-id", id);
      this.$("#todo-list").append(todoElement);
    });
    this.listen("todo-removed", ({ id }: any) => {
      this.$("#" + id).remove();
    });
  }
  update() {}
}
customElements.define("todo-list", TodoListElement);
