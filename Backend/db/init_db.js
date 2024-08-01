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

export default connectFileDB