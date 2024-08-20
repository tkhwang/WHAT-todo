import { FirestoreSnapshotListenerPool } from "@whatTodo/models";

export class FirestoreSnapshotListener {
  private static pools: FirestoreSnapshotListenerPool = new Map();

  static has(key: string) {
    return this.pools.has(key);
  }

  static set(key: string, listener: () => void) {
    if (this.has(key)) return false;

    this.pools.set(key, listener);
    console.log(`[+][FirestoreSnapshotListener] set: ${key}`);
    return true;
  }

  static clear() {
    this.pools.forEach((unsubscribe: () => void) => unsubscribe());
    console.log(`[+][FirestoreSnapshotListener] cleared`);
  }
}
