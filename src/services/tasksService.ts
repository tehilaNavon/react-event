import { authFetch } from "./authService";
import { type Task } from "../types/tasks";

export const toggleTask = async (taskID: number, isCompleted: boolean): Promise<void> => {
  await authFetch(`/Tasks/${taskID}/toggle`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ isCompleted }),
  });
};

export const getTasksByEvent = async (eventID: number) => {
  const res = await authFetch(`/Tasks?id=${eventID}`);
  return res.json();
};
// src/services/tasksService.ts

export async function fetchTasks(eventID: number): Promise<Task[]> {
  const res = await authFetch(`/Tasks?eventId=${eventID}`);
  if (!res.ok) throw new Error("שגיאה בטעינת משימות");
  return res.json();
}
 
export async function toggleTaskAPI(
  taskID: number,
  isCompleted: boolean
): Promise<void> {
  const res = await authFetch(`/Tasks/${taskID}/toggle`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ isCompleted }),
  });
  if (!res.ok) throw new Error("שגיאה בעדכון משימה");
}
 
export async function addCustomTaskAPI(
  task: Omit<Task, "taskID">
): Promise<Task> {
  const res = await authFetch(`/Tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });
  if (!res.ok) throw new Error("שגיאה בהוספת משימה");
  return res.json();
}
 