export const COLLECTIONS = {
  USERS: "users",
  TASKS: "tasks",
}

export type FirestoreSnapshotListenerPool = Map<string, () => void>
