#! /usr/bin/env node
import { program, InvalidArgumentError } from "commander";
import {
  createTask,
  readList,
  doneChangeValue,
  reset,
  idSwap,
} from "./command.js";
import { table } from "table";
import chalk from "chalk";

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

      if (tasks.length === 0) {
        return console.log(chalk.blue("Vous n'avez aucune tache"));
      }
      const tabTasks = [[chalk.bold("ID"), chalk.bold("Task")]];

      objectTri(tasks);

      tasks.map((el) => {
        tabTasks.push([
          chalk.green(el.ID),
          el.done ? chalk.green(chalk.dim(el.task)) : chalk.red(el.task),
        ]);
      });

      console.log(table(tabTasks));
    } catch (err) {
      console.log(err);
    }
  });

program
  .command("done")
  .argument("<num>", "The task num", isNumber)
  .description("done tasks")
  .action(async (num) => {
    try {
      const done = await doneChangeValue(num, true);
      if (!done) {
        console.log(chalk.red("Invalid [Num]"));
      }
    } catch (err) {
      console.log(err);
    }
  });

program
  .command("undone")
  .argument("<num>", "The task num", isNumber)
  .description("undone tasks")
  .action(async (num) => {
    try {
      const done = await doneChangeValue(num, false);
      if (!done) {
        console.log(chalk.red("Invalid [Num]"));
      }
    } catch (err) {
      console.log(err);
    }
  });

program
  .command("reset")
  .description("reset")
  .action(async () => {
    try {
      const done = await reset();
      if (!done) {
        console.log(chalk.red("Une erreur est survenue..."));
      }
    } catch (err) {
      console.log(err);
    }
  });
program
  .command("swap")
  .description("swap tasks")
  .argument("<id1>", "The first ID to swap", isNumber)
  .argument("<id2>", "The second ID to swap", isNumber)
  .action(async (id1, id2) => {
    if (id1 === id2) return;
    try {
      const swapped = await idSwap(id1, id2);

      if (!swapped) {
        console.log(chalk.red("Erreur"));
      }
    } catch (err) {
      console.log(err);
    }
  });
program.parse();

function isNumber(number) {
  const num = parseInt(number, 10);
  if (isNaN(num)) {
    throw new InvalidArgumentError(chalk.red("Task must not empty."));
  }
  return num;
}
function taskNotEmpty(task) {
  if (task === "") {
    throw new InvalidArgumentError(chalk.red("Task must not empty."));
  }
  return task;
}

function objectTri(tab) {
  let change;
  do {
    change = false;
    for (let i = 0; i < tab.length - 1; i++) {
      if (tab[i].ID > tab[i + 1].ID) {
        console.log(i, tab[i].ID);
        const tmp = tab[i];
        tab[i] = tab[i + 1];
        tab[i + 1] = tmp;
        change = true;
      }
    }
  } while (change);
}
