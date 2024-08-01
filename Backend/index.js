import {app} from "./app.js"
import {connectFileDB} from "./db/init_db.js"


import dotenv from "dotenv"
dotenv.config({
  path: './.env'
})


// Connecting to file DB , returns a Promise
connectFileDB()
.then((msg) => {
  // app listening here 
  app.listen(process.env.PORT || 8000, () => {
    console.log(`[Server@index.js] Todo app Server running on port ${process.env.PORT || 8000}`);
    console.log(msg);
  })
})
.catch((err) => {
  console.error("[Server@index.js] Failed to connect to FileDB!!!");
  console.error("[Server@index.js] Server starting aborted");
  console.error(err);
})