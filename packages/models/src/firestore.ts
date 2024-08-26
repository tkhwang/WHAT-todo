export const COLLECTIONS = {
  LISTS: "lists",
  STEPS: "steps",
  TASKS: "tasks",
  USERS: "users",
}

export type FirestoreSnapshotListenerPool = Map<string, () => void>
