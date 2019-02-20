import { events } from "./events.js";

function generateId(): string {
  return (
    "_" +
    Math.random()
      .toString(36)
      .substr(2, 9)
  );
}

export class Todo {
  constructor(readonly id: string, private _name: string) {}
  get name(): string {
    return this._name;
  }
  set name(_name: string) {
    if (_name !== this._name) {
      events.emit("todo-changed", { id: this.id });
    }
    this._name = _name;
  }
  static create(name: string): Todo {
    return new Todo(generateId(), name);
  }
}

export class TodoList {
  readonly todos: Todo[] = [];
  constructor() {}
  get(id: string): Todo {
    return this.todos.find(t => t.id === id);
  }
  add(todo: Todo): void {
    this.todos.push(todo);
    events.emit("todo-added", { id: todo.id });
  }
  remove(id: string): void {
    for (let i = this.todos.length - 1; i >= 0; i--) {
      if (this.todos[i].id === id) {
        this.todos.splice(i, 1);
      }
    }
    events.emit("todo-removed", { id });
  }
}

export const todoList: TodoList = new TodoList();
