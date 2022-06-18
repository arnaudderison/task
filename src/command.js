import os from "os";
import path from "path";
import { readTask, saveTask } from "./utils.js";
import { Task } from "./task.js";

const DEFAULT_FILE = path.join(os.homedir(), "task.json");

export async function createTask(task) {
  const tasks = await readTask(DEFAULT_FILE);

//   tasks.push(Task);
    tasks.push({"task": task});

  console.log(tasks)
  await saveTask(DEFAULT_FILE, tasks);
}
