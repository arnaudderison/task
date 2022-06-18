import os from "os";
import path from "path";
import { readTask, saveTask } from "./utils.js";

const DEFAULT_FILE = path.join(os.homedir(), "task.json");

export async function createTask(task) {
  const tasks = await readTask(DEFAULT_FILE);

//   tasks.push(Task);
    tasks.push({"task": task, "done": false});

  await saveTask(DEFAULT_FILE, tasks);
}

export async function readList(isAll=false){
  if(isAll){
    const tasks = await readTask(DEFAULT_FILE);
    return tasks
  }else{
    const tasks = await readTask(DEFAULT_FILE);
    return tasks.filter(task => task.done !== true)
  }
}

export async function doneChangeValue(id, value){
  const tasks = await readTask(DEFAULT_FILE);

  if(tasks[id-1]){
    tasks[id-1].done = true
    await saveTask(DEFAULT_FILE, tasks)
    return true
  }else{
    return false
  }


  
}