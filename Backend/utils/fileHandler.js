// A utils for handling file reading and writing operations
import fs from "fs"

const read_file = async (db_path) => {
    console.log("[utils@fileHandler] Reading data from fileDB...");
    const data = await fs.readFile(db_path,'utf-8');
    return JSON.parse(data);
}

const write_file = async (db_path,data) => {
    console.log("[utils@fileHandler] Writing Data to fileDB...")
    await fs.writeFile(db_path, JSON.stringify(data,null,2),'utf-8');
}

export {
    read_file,
    write_file
}