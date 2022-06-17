const {program, InvalidArgumentError} = require('commander');

module.exports.extractCommande = (argv)=>{
    const args = argv.slice(1);

    program
    .command("add")
    .argument("<task>", "stain you want to add", taskNotEmpty)
    .description("add the content of your task <string>")
    .action((task)=>{
        console.log(task)
    })

    program.parse();
}


function taskNotEmpty(task){
    if(task === ""){
        throw new InvalidArgumentError("Task must not empty.");
    }
    return task
}