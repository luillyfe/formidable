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
