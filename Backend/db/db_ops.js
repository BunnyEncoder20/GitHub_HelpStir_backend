import {promises as fs} from "fs"
import ApiError from "../utils/ApiError.js"

const db_path = "./fileDB.json"

const connectFileDB = async () => {
    try {
        await fs.access(db_path, fs.constants.F_OK);
        return "[init_db] FileDB Found.";
    } 
    catch (err) {
        // File doesn't exist, create new FileDB
        await fs.writeFile(db_path,"[]");
        return "[init_db] FileDB not Found.\n[Server@init_db] Created new FileDB";
    }
}


// A utils for handling file reading and writing operations

const read_db = async () => {
    try {
        console.log("[db_ops] Reading data from fileDB...");
        const data = await fs.readFile(db_path,'utf-8');
        console.log("[db_ops] Reading data completed.");
        return JSON.parse(data);
    } catch (errors) {
        throw new ApiError(500,"[db_ops] Error in reading file",errors);
    }
}

const write_db = async (data) => {
    try {
        console.log("[db_ops] Writing Data to fileDB...")
        await fs.writeFile(db_path, JSON.stringify(data,null,2),'utf-8');
        console.log("[db_ops] Writing data completed.");
    } catch (errors) {
        throw new ApiError(500,"[db_ops] Error in writing file".errors);
    }
}


export {
    connectFileDB,
    read_db,
    write_db
}