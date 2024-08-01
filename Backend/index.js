import {app} from "./app.js"
import {connectFileDB} from "./db/db_connect.js"


import dotenv from "dotenv"
dotenv.config({
  path: './.env'
})


// Connecting to file DB , returns a Promise
connectFileDB()
.then(() => {
  // app listening here 
  app.listen(process.env.PORT || 8000, () => {
    console.log(`[Server@index.js] Todo app Server running on port ${port}`);
  })
})
.catch((err) => {
  console.log("[Server@index.js] Failed to connect to FileDB!!!");
  console.log("[Server@index.js] Server starting aborted");
  exit(1);
})