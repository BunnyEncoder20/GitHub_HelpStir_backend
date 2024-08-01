import fs from "fs"

const db_path = "./fileDB.json";

const connectFileDB = () => {
    return new Promise((resolve,reject) => {
        fs.access(db_path, fs.constants.F_OK,(err) => {
            if(err){
                // File doesn't exist, crete new FileDB
                fs.appendFile("fileDB.json","[]",(err)=>{
                    if (err) 
                        throw err;
                    resolve("[Server@init_db] FileDB not Found.\n[Server@init_db] Created new FileDB");
                })
            }
            else{
                // File exists
                resolve("[Server@init_db] FileDB Found.")
            }
        })
    })
}


// A utils for handling file reading and writing operations

const read_db = async (db_path) => {
    console.log("[utils@db_ops] Reading data from fileDB...");
    const data = await fs.readFile(db_path,'utf-8');
    return JSON.parse(data);
}

const write_db = async (db_path,data) => {
    console.log("[utils@db_ops] Writing Data to fileDB...")
    await fs.writeFile(db_path, JSON.stringify(data,null,2),'utf-8');
}


export {
    connectFileDB,
    read_db,
    write_db
}