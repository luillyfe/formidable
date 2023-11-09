import { Fields, FirebaseDoc, Task } from "./types";
import { formatDocument } from "./utils";

const firestoreURL = import.meta.env.VITE_FIRESTORE_URL;

async function fetchDocuments(): Promise<FirebaseDoc[]> {
  const response = await fetch(`${firestoreURL}/(default)/documents/todos`);
  // If everything went smoothly
  if (response.ok) {
    const { documents } = await response.json();

    return documents;
  }

  // TODO: handle error
  return [
    {
      fields: {
        id: { stringValue: "" },
        title: { stringValue: "" },
        description: { stringValue: "" },
      },
    },
  ];
}

export async function fetchTodos(): Promise<Task[]> {
  const documents = await fetchDocuments();
  return documents.map(formatDocument);
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

  const response = await fetch(
    `${firestoreURL}/(default)/documents/todos/${todo.id}`,
    {
      method: "PATCH",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }
  );

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
