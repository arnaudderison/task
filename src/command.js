import os from "os";
import path from "path";
import { readTask, saveTask } from "./utils.js";

const DEFAULT_FILE = path.join(os.homedir(), "task.json");

export async function createTask(task) {
  const tasks = await readTask(DEFAULT_FILE);

//   tasks.push(Task);
    tasks.push({"task": task});

  console.log(tasks)
  await saveTask(DEFAULT_FILE, tasks);
}

export async function readList(isAll=false){
  if(isAll){
    const tasks = await readTask(DEFAULT_FILE);
    return tasks
  }else console.log('en cour de création...')
}