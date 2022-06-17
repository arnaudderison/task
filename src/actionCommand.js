const fs = require("fs");
const os = require('os')

const DEFAULT_FILE = "."

export function createTask (){
    console.log('creation en cours...')
    console.log(os.homedir)
    
}

function fileExist(file){
    console.log('file existe ?')
}