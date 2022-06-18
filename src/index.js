#! /usr/bin/env node
import { program, InvalidArgumentError } from "commander";
import { createTask, readList } from "./command.js";
import { table } from 'table';

program
  .command("add")
  .argument("<task>", "stain you want to add", taskNotEmpty)
  .description("add the content of your task <string>")
  .action(async (task) => {
    await createTask(task);
  });

program
  .command("list")
  .option("-a, -all", "include done tasks")
  .description("list tasks")
  .action(async (option) => {
    try {
      const tasks = await readList(option.All);

      let counter = 0;
      const tabTasks = [["Number", "Task"]];

      tasks.map((el) => {
        counter++;
        tabTasks.push([`${counter}`, el.task]);
      });

      console.log(table(tabTasks));
    } catch (err) {
      console.log(err);
    }
  });

program.parse();

function taskNotEmpty(task) {
  if (task === "") {
    throw new InvalidArgumentError("Task must not empty.");
  }
  return task;
}
