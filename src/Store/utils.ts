import { FirebaseDoc, Task } from "./types";

export function formatDocument(document: FirebaseDoc): Task {
  return {
    id: document?.fields?.id.stringValue || "",
    title: document?.fields?.title.stringValue || "",
    description: document?.fields?.description.stringValue || "",
  };
}
