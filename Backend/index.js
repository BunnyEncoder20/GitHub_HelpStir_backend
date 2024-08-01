import app from "./app.js"
import {connectFileDB} from "./db/db_ops.js"


import dotenv from "dotenv"
dotenv.config({
  path: './.env'
})



// Connecting to file DB , Starting the Server
connectFileDB()
.then((msg) => {
  // app listening here 
  app.listen(process.env.PORT || 8000, () => {
    console.log(`[Server] Todo app Server running on port ${process.env.PORT || 8000}`);
    console.log(`[Server] url : localhost:${process.env.PORT || 8000}/api/v1/todos`);
    console.log(msg);
  })
})
.catch((err) => {
  console.error("[Server] Failed to connect to FileDB!!!");
  console.error("[Server] Server starting aborted");
  console.error(err);
  process.exit();
})