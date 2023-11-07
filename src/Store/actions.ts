import { FirebaseDoc, Task } from "./types";

const firestoreURL = import.meta.env.VITE_FIRESTORE_URL;

export async function fetchTodos(): Promise<Task[]> {
  const response = await fetch(`${firestoreURL}/(default)/documents/todos`);
  // If everything went smoothly
  if (response.ok) {
    const { documents } = await response.json();

    const todos = documents.map((document: FirebaseDoc) => ({
      id: document?.fields?.id.integerValue || 0,
      title: document?.fields?.title.stringValue || "",
      description: document?.fields?.description.stringValue || "",
    }));

    return todos;
  }

  return [];
}
