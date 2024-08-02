import asyncHandler from "../utils/asyncHandler.js"
import ApiResponse from "../utils/ApiResponse.js" 
import ApiError from "../utils/ApiError.js";
import {read_db, write_db} from "../db/db_ops.js"


// Todos Endpoint Landing (no functionality)
const landing = (req,res) => {
    const api_response = new ApiResponse(200,"Todo api endpoint working");
    res.status(api_response.statusCode).json(api_response);
}



// fetch Todos 
const fetch_todo = asyncHandler ( async (req,res) => {
    const data = await read_db();
    const { id,sort } = req.query;

    if (id) {
        const todo = data.find(todo => todo._id === id)
        if (!todo){
            throw new ApiError(404,"[Controller] Todo not found");
        }
        
        const api_response = new ApiResponse(200,"Todo found",todo);
        return res.status(200).json(api_response);
    }

    if (sort){
        if (sort === "byCreatedDate.oldest"){
            data.sort((a,b) => new Date(a.createdAt) - new Date(b.createdAt));
        }
        else if (sort === "byCreatedDate.latest"){
            data.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt));
        }
        else if (sort === "byUpdatedDate.oldest"){
            data.sort((a,b) => new Date(a.updatedAt) - new Date(b.updatedAt));
        }
        else if (sort === "byUpdatedDate.latest"){
            data.sort((a,b) => new Date(b.updatedAt) - new Date(a.updatedAt));
        }
        else {
            throw new ApiError(400,"The sorting methdod is not correct")
        }
    }
    
    const api_response = new ApiResponse(200, "Successfully fetched todos", data);
    res.status(api_response.statusCode).json(api_response);
});



// adds a new todo
const add_todo = asyncHandler(async (req,res) => {
    const {title,description,completed,dueDate,priority} = req.body;

    if (!(title && description && completed && dueDate && priority)){
        throw new ApiError(404,"[Controller] Required fields are missing in body");
    }

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



// Update Todo




// Delete Todo




// Mark as Done




export {
    landing,
    add_todo,
    fetch_todo,
}