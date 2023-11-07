import { Fields, FirebaseDoc, Task } from "./types";

const firestoreURL = import.meta.env.VITE_FIRESTORE_URL;

export async function fetchTodos(): Promise<Task[]> {
  const response = await fetch(`${firestoreURL}/(default)/documents/todos`);
  // If everything went smoothly
  if (response.ok) {
    const { documents } = await response.json();

    const todos = documents.map((document: FirebaseDoc) => ({
      id: document?.fields?.id.stringValue || "",
      title: document?.fields?.title.stringValue || "",
      description: document?.fields?.description.stringValue || "",
    }));

    return todos;
  }

  return [];
}

export async function addTodo(todo: Task): Promise<Task> {
  // Build proper body for firestore collection
  const body = {
    fields: {
      id: {
        stringValue: todo.id,
      },
      title: {
        stringValue: todo.title,
      },
      description: {
        stringValue: todo.description,
      },
    },
  };

  const response = await fetch(`${firestoreURL}/(default)/documents/todos`, {
    method: "POST",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (response.ok) {
    const { fields } = (await response.json()) as { fields: Fields };
    const todo = {
      id: fields.id.stringValue,
      title: fields.title.stringValue,
      description: fields.description.stringValue,
    };

    return todo;
  }

  // TODO: Silent error??
  return { id: "", title: "", description: "" };
}
