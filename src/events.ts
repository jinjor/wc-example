export interface Listenable {
  listen(type: string, callback: (detail: any) => void): () => void;
}
export interface Emittable {
  emit(type: string, detail: any): void;
}
export class Events implements Listenable, Emittable {
  private target = new EventTarget();
  emit(type: string, detail: any): void {
    setTimeout(() => {
      this.target.dispatchEvent(
        new CustomEvent(type, {
          detail
        })
      );
    });
  }
  listen(type: string, callback: (detail: any) => void): () => void {
    function handle(e: CustomEvent) {
      callback(e.detail);
    }
    this.target.addEventListener(type, handle);
    return () => {
      this.target.removeEventListener(type, handle);
    };
  }
}

export const events = new Events();
