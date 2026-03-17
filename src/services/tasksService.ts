import { authFetch } from "./authService";

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
