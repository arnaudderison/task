import os from "os";
import path from "path";
import { readTask, saveTask } from "./utils.js";

const DEFAULT_FILE = path.join(os.homedir(), "task.json");

export async function createTask(task) {
  const tasks = await readTask(DEFAULT_FILE);
  const id = Math.max(0, ...tasks.map(({ ID }) => ID)) + 1;

  //   tasks.push(Task);
  tasks.push({ ID: id, task: task, done: false });

  await saveTask(DEFAULT_FILE, tasks);
}

export async function readList(isAll = false) {
  if (isAll) {
    const tasks = await readTask(DEFAULT_FILE);
    return tasks;
  } else {
    const tasks = await readTask(DEFAULT_FILE);
    return tasks.filter((task) => task.done !== true);
  }
}

export async function doneChangeValue(id, value) {
  try {
    const tasks = await readTask(DEFAULT_FILE);

    const idexist = tasks.find((task) => task.ID === id);

    if (idexist !== undefined) {
      idexist.done = value;
      await saveTask(DEFAULT_FILE, tasks);
      return true;
    }
    return false;
  } catch (err) {
    console.log(err);
  }
}

export async function reset() {
  try {
    await saveTask(DEFAULT_FILE, []);
    return true;
  } catch (err) {
    return false;
  }
}

export async function idSwap(id1, id2){
  const tasks = await readTask(DEFAULT_FILE);

  const task1 = tasks.find((task)=> task.ID === id1)

  if(task1 === undefined) return false

  const task2 = tasks.find((task)=> task.ID === id2)
  if(task2 === undefined) return false

  task1.ID = id2
  task2.ID = id1
  await saveTask(DEFAULT_FILE, tasks)
  return true
}

export async function deleteTask(id){
  try{
    const tasks = await readList(DEFAULT_FILE);

    const newTasks = tasks.filter((task) => task.ID !== id)

    await saveTask(DEFAULT_FILE, newTasks)
    return true
  }catch(err){
    return false
  }
}