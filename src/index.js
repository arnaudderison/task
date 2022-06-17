const {Command, InvalidArgumentError} = require('commander');


const program = new Command()
program.name("task").description("todoList")

program
.command("add")
.argument("<task>", "stain you want to add", taskNotEmpty)
.description("add the content of your task <string>")
.action((task)=>{
    console.log(task)
})


function taskNotEmpty(task){
    if(task === ""){
        throw new InvalidArgumentError("Task must not empty.");
    }
    return task
}

