export interface Task {
  id: number;
  title: string;
  description?: string;
  dueDate?: Date;
  priority?: "high" | "medium" | "low";
  status?: "to-do" | "in progress" | "completed";
  category?: string;
  subtasks?: Task[];
  attachments?: string[];
}

export interface FirebaseDoc {
  fields: {
    id: { integerValue: number };
    title: { stringValue: string };
    description: { stringValue: string };
  };
}
