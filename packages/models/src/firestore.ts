export const COLLECTIONS = {
  USERS: "users",
  TODOS: "todos",
}

export type FirestoreSnapshotListenerPool = Map<string, () => void>
