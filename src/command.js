import os from 'os'
import fs from 'fs/promises'
import path from 'path'

const DEFAULT_FILE = path.join(os.homedir(), 'task.json') 

export async function createTask(){
    const isFileExist = await fileExiste(DEFAULT_FILE)
    if(!isFileExist){
        await saveTask(DEFAULT_FILE)
    }
}

async function saveTask(file){
    try{
         await fs.writeFile(file, JSON.stringify({message: "super cool"}))
         return 
    }catch(err){
        console.log("Fatal Error")
    }
    
}

async function fileExiste(file){
    try{
        await fs.access(file)
        return true
    }catch(err){
        return false
    }
}