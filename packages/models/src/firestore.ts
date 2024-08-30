export const COLLECTIONS = {
  LISTS: "lists",
  STEPS: "steps",
  TASKS: "tasks",
  USERS: "users",
  //
  IS_DONE: "is-done",
}

export type FirestoreSnapshotListenerPool = Map<string, () => void>
