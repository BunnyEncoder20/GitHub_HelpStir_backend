import asyncHandler from "../utils/asyncHandler.js"
import ApiResponse from "../utils/ApiResponse.js" 
import ApiError from "../utils/ApiError.js";
import {read_db, write_db} from "../db/db_ops.js"


// Todos Endpoint Landing (no functionality)
const landing = (req,res) => {
    const api_response = new ApiResponse(200,"Todo api endpoint working");
    res.status(api_response.statusCode).json(api_response);
}


// create a new todo
const create_todo = asyncHandler(async (req,res) => {
    const {title,description,completed,dueDate,priority} = req.body;
    const data = await read_db();

    let new_todo = {
        _id : Date.now(),
        title,
        description,
        completed,
        dueDate,
        priority,
        createdAt : new Date().toISOString(),
        updatedAt : new Date().toISOString() 
    };

    data.push(new_todo);
    await write_db(data);
    
    const api_response = new ApiResponse(200,"Successfully created new todo",new_todo);
    res.status(200).json(api_response);
});


// fetch all todos
const fetch_todo = asyncHandler ( async (req,res) => {
    const data = await read_db();
    const api_response = new ApiResponse(200, "Successfully fetched all todos", data);
    res.status(api_response.statusCode).json(api_response);
});




export {
    landing,
    create_todo,
    fetch_todo,
}