import asyncHandler from "../utils/asyncHandler.js"
import ApiResponse from "../utils/ApiResponse.js" 
import {read_db, write_db} from "../db/db_ops.js"

const db_path = "../db/fileDB.json"

// Todos Endpoint Landing (no functionality)
const landing = (req,res) => {
    const api_response = new ApiResponse(200,"Todo api endpoint working");
    res.status(api_response.statusCode).json(api_response);
}


// create a new todo
const create_todo = asyncHandler(async (req,res) => {
    const new_todo = req.body;
    const data = await read_db(db_path);

    new_todo._id = Date.now();

    data.push(new_todo);
    await write_db(db_path,data);
    
    const api_response = new ApiResponse(200,"Successfully created new todo",new_todo);
    res.status(api_response.statusCode).json(api_response);
});


// fetch all todos
const fetch_todo = asyncHandler ( async (req,res) => {
    const data = await read_db(db_path)

    const api_response = new ApiResponse(200,"Successfully fetched all todos",data);
    res.status(api_response.statusCode).json(api_response);
});




export {
    landing,
    create_todo,
    fetch_todo,
}