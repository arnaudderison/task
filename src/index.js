#! /usr/bin/env node
import { program, InvalidArgumentError } from "commander";
import { createTask, readList, doneChangeValue } from "./command.js";
import { table } from 'table';
import chalk from 'chalk';

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
      const tabTasks = [[chalk.bold("N°"), chalk.bold("Task")]];

      tasks.map((el) => {
        counter++;
        tabTasks.push([chalk.green(`${counter}`), chalk.blue(chalk.bold(el.task))]);
      });

      console.log(table(tabTasks));
    } catch (err) {
      console.log(err);
    }
  });

program
  .command("done")
  .argument('<num>', "The task num", isNumber)
  .description("done tasks")
  .action(async (num)=>{
    try{
      const done = await doneChangeValue(num, true)
      if(!done){
        console.log(chalk.red("Invalid [Num]"))
      }
    }catch(err){
      console.log(err)
    }
  })

program.parse();

function isNumber(number){
  const num = parseInt(number, 10)
  if(isNaN(num)){
    throw new InvalidArgumentError(chalk.red("Task must not empty."))
  }
  return num
}
function taskNotEmpty(task) {
  if (task === "") {
    throw new InvalidArgumentError(chalk.red("Task must not empty."));
  }
  return task;
}
