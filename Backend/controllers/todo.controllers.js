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
        console.log(`[Controller] Fetch request received with _id:${id}`);

        const todo = data.find(todo => todo._id === id)
        if (!todo){
            throw new ApiError(404,"[Controller] Todo not found");
        }
        
        const api_response = new ApiResponse(200,"Todo found",todo);
        return res.status(200).json(api_response);
    }

    if (sort){
        console.log(`[Controller] Fetch request received with _sort:${sort}`);

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
    
    console.log(`[Controller] Successfully fetched todos`);
    const api_response = new ApiResponse(200, "Successfully fetched todos", data);
    res.status(api_response.statusCode).json(api_response);
});



// adds a new todo
const add_todo = asyncHandler(async (req,res) => {
    const {title,description,completed,dueDate,priority} = req.body;

    console.log(`[Controller] Add todo request received for _id:${id}`);

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
    
    console.log(`[Controller] Todo created for _id:${id}`);
    const api_response = new ApiResponse(200,"Successfully created new todo",new_todo);
    res.status(200).json(api_response);
});



// Update Todo
const update_todo = asyncHandler( async (req,res) => {
    const data = await read_db()
    const { updated_todo } = req.body;
    const { id } = req.query;

    console.log(`[Controller] Update request received for _id:${id}`);

    let old_todo = data.find((todo) => todo._id === id);
    if (!old_todo){
        throw new ApiError(404,"[Controller] Todo not found");
    }

    // updating the old todo object
    updated_todo.updatedAt = new Date().toISOString();
    Object.assign(old_todo, updated_todo)

    // writing date back
    await write_db(data);

    console.log("[Controller] Updated Todo successfully.");
    const api_response = new ApiResponse(201,"Successfully updated Todo",old_todo);
    res.status(200).json(api_response);
});



// Delete Todo
const delete_todo = asyncHandler( async (req,res) => {});



// Mark as Done
const markDone_todo = asyncHandler( async (req,res) => {});



export {
    landing,
    add_todo,
    fetch_todo,
    update_todo,
    delete_todo,
    markDone_todo
}