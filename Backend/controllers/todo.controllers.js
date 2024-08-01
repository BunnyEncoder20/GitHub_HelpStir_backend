import asyncHandler from "../utils/asyncHandler.js"
import ApiResponse from "../utils/ApiResponse.js" 
import * as fileHandler from "../utils/fileHandler.js"

const db_path = "../db/fileDB.json"

// Todos Endpoint Landing (no functionality)
const landing = (req,res) => {
    const api_response = new ApiResponse(200,"Todo Api Endpoint Working",null);
    res.status(api_response.statusCode).json(api_response);
}

// create a new todo
const create_todo = asyncHandler(async (req,res) => {
    const new_todo = req.body;
    const todos = await fileHandler.read_file(db_path);

    new_todo._id = Date.now();

    todos.push(new_todo);
    await fileHandler.write_file(db_path,todos);
    
    new ApiResponse(200,"Successfully created new todo entry",new_todo)
});

export {
    landing,
    create_todo,
}