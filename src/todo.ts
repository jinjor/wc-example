import { html } from "./html.js";
import { styles } from "./styles.js";
import { UIElement } from "./ui-element.js";
import { todoList } from "./data.js";

export class TodoElement extends UIElement {
  static get observedAttributes() {
    return ["todo-id"];
  }
  constructor() {
    super(html`
      ${styles}
      <div>
        <span id="name"></span>
        <button id="remove">X</button>
      </div>
    `);
  }
  attatchEvents() {
    this.on("click", "#name", (e: MouseEvent, target: HTMLElement) => {
      const id = this.getAttribute("todo-id");
      todoList.get(id).name = target.textContent + "!";
    });
    this.on("click", "#remove", (e: MouseEvent) => {
      const id = this.getAttribute("todo-id");
      todoList.remove(id);
    });
  }
  subscribe() {
    this.listen("todo-changed", this.update.bind(this));
  }
  attributeChangedCallback() {
    this.update();
  }
  update() {
    const id = this.getAttribute("todo-id");
    const todo = todoList.get(id);
    this.$("#name").textContent = todo.name;
  }
}
customElements.define("x-todo", TodoElement);
