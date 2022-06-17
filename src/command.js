const {program, InvalidArgumentError} = require('commander');
import {createTask} from './actionCommand.js'

export function extractCommande (argv){

    program
    .command("add")
    .argument("<task>", "stain you want to add", taskNotEmpty)
    .description("add the content of your task <string>")
    .action((task)=>{
        console.log(task)
        createTask()
    })

    program.parse();
}


function taskNotEmpty(task){
    if(task === ""){
        throw new InvalidArgumentError("Task must not empty.");
    }
    return task
}