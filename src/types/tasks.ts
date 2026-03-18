// src/types/tasksTypes.ts

export interface Task {
  taskID: number;
  eventID: number;
  categoryID: number | null;
  vendorID: number | null;
  vendorName?: string;
  description: string;
  isCompleted: boolean;
  dueDate: string | null;
  isCustom: boolean;
}

export interface SelectedVendor {
  id: number;
  name: string;
}

export type Priority = "high" | "medium" | "low";
