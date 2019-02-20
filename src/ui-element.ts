import { events } from "./events.js";

export abstract class UIElement extends HTMLElement {
  private cleaners: (() => void)[] = [];
  constructor(template: string, mode: "open" | "closed" = "open") {
    super();
    const shadowRoot = this.attachShadow({ mode });
    shadowRoot.innerHTML = template;
    this.attatchEvents();
  }
  // abstracts
  protected abstract attatchEvents(): void;
  protected abstract subscribe(): void;
  protected cleanup() {}
  // utils
  protected on(
    type: string,
    selector: string,
    callback: (e: Event, element: Element) => void
  ): void {
    const handle = (e: Event) => {
      let target = e.target as HTMLElement;
      while (target && target !== e.currentTarget) {
        if (target.matches(selector)) {
          callback(e, target);
          return;
        } else {
          target = target.parentElement;
        }
      }
    };
    this.shadowRoot.addEventListener(type, handle);
  }
  protected $<E extends HTMLElement>(q: string): E {
    return this.shadowRoot.querySelector(q);
  }
  protected listen(type: string, handle: (detail: any) => void): void {
    this.cleaners.push(events.listen(type, handle));
  }
  protected listenWindow(key: string, callback: (e: Event) => void) {
    window.addEventListener(key, callback);
    this.cleaners.push(() => window.removeEventListener(key, callback));
  }
  // callbacks
  connectedCallback() {
    this.subscribe();
  }
  disconnectedCallback() {
    for (let cleaner of this.cleaners) {
      cleaner();
    }
  }
}
