export class InputManager {
  keys: Record<string, boolean> = {};

  onKeyDown(e: KeyboardEvent) {
    this.keys[e.key] = true;
  }

  onKeyUp(e: KeyboardEvent) {
    this.keys[e.key] = false;
  }
}