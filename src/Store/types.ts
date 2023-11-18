export interface Task {
  id: string;
  title: string;
  description?: string;
  dueDate?: Date;
  priority?: "high" | "medium" | "low";
  status?: "to-do" | "in progress" | "completed";
  category?: string;
  subtasks?: Task[];
  attachments?: string[];
}

export interface TodoElement extends Task {
  handleDelete: (todoId: string) => void;
}

export interface Fields {
  id: { stringValue: string };
  title: { stringValue: string };
  description: { stringValue: string };
}

export interface FirebaseDoc {
  fields: Fields;
}

export interface FormTodoErrors {
  title: string;
  description: string;
}
