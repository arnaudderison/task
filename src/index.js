import { program } from 'commander';
import { createTask } from './command.js';

program
.command("add")
.argument("<task>", "stain you want to add", taskNotEmpty)
.description("add the content of your task <string>")
.action((task)=>{
    createTask()
})

program.parse();


function taskNotEmpty(task){
    if(task === ""){
        throw new InvalidArgumentError("Task must not empty.");
    }
    return task
}
