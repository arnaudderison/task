import fs from "fs/promises";
export async function readTask(file){
    const existe = await fileExiste(file)
    if(!existe){
        const tasks = [];
        await saveTask(file, tasks);
        return tasks;
    }

    const buffer = await fs.readFile(file);
    const json = buffer.toString();
    const tasks = jsonParse(json)
    return tasks
    
}

export async function fileExiste(file){
    try{
        await fs.access(file)
        return true
    }catch(err){
        return false
    }
}

export async function saveTask(file, task) {
    try {
      await fs.writeFile(file, JSON.stringify(task));
    } catch (err) {
      console.log("Fatal Error");
    }
  }
  
  function jsonParse(json) {
    try {
      return JSON.parse(json, valideData);
    } catch (err) {
      console.log(err);
    }
  }

function valideData(key, value){
    switch(key){
        case "task":
            if (!isNaN(value)) {
                throw new Error('pas de string')
            } 
            return value;
        
        case "ID": 
        if (isNaN(value)) { 
          throw new Error("Invalid id in JSON");
        }
        return value
    
        case "done":
          if(!(value === false || value === true)){
            throw new Error("Invalid done JSON")
          }
          return value
            
        default:
            return value
    }
  }
  