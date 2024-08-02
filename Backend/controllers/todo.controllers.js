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

        const todo = data.find(todo => todo._id == id)
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
    const {title,description,done,dueDate,priority} = req.body;

    console.log(`[Controller] Add todo request received for "${title}"`);
    // console.table([title,description,done,dueDate,priority]);

    if (title == null || description == null || done == null || dueDate == null || priority == null){
        throw new ApiError(404,"[Controller] Required fields are missing in body");
    }

    const data = await read_db();

    let new_todo = {
        _id : Date.now(),
        title,
        description,
        done,
        dueDate,
        priority,
        createdAt : new Date().toISOString(),
        updatedAt : new Date().toISOString() 
    };

    data.push(new_todo);
    await write_db(data);
    
    console.log(`[Controller] Todo created with _id:${new_todo._id}`);
    const api_response = new ApiResponse(200,"Successfully created new todo",new_todo);
    res.status(200).json(api_response);
});



// Update Todo
const update_todo = asyncHandler( async (req,res) => {
    const data = await read_db()
    const updated_todo = req.body;
    const { id } = req.query;

    console.log(`[Controller] Update request received for _id:${id}`);

    let old_todo = data.find((todo) => todo._id == id);
    if (!old_todo){
        throw new ApiError(404,"[Controller] Todo not found");
    }

    // updating the old todo object
    updated_todo.updatedAt = new Date().toISOString();
    Object.assign(old_todo, updated_todo);

    // writing date back
    await write_db(data);

    console.log("[Controller] Updated Todo successfully.");
    const api_response = new ApiResponse(201,"Successfully updated Todo",old_todo);
    res.status(200).json(api_response);
});



// Delete Todo
const delete_todo = asyncHandler( async (req,res) => {
    const data = read_db();
    const { id } = req.query();
    if (!id) {
        throw new ApiError(400,"No _id given for deletion request");
    }

    console.log(`[Controller] Delete Todo request received for _id:${id}`);

    // Find if the todo exists
    let to_be_deleted = data.find((todo) => todo._id === id);
    if (!to_be_deleted) { 
        throw new ApiError(404,"The Todo to be deleted not found")
    }

    // created new data array without the deleted one
    const updated_data = data.filter((todo) => todo._id != id);

    // Write the updated data
    await write_db(updated_data);

    console.log("[Controller] Deleted Todo successfully.");
    const api_response = new ApiResponse(200,"Successfully Deleted Todo",to_be_deleted);
    res.status(200).json(api_response);
});



// Mark Todo as Done
const markDone_todo = asyncHandler( async (req,res) => {
    const data = await read_db();
    const { id } = req.query;
    if (!id) {
        throw new ApiError(400,"No _id given for marking request");
    }

    console.log(`[Controller] Mark as done request received for _id:${id}`);

    // Find if the todo exists or already marked as done
    let to_be_marked = data.find((todo) => todo._id == id);
    if (!to_be_marked) { 
        throw new ApiError(404,"The Todo to mark as done not found");
    }
    else if (to_be_marked.done){
        const api_response = new ApiResponse(202,"The Todo is already marked as done",to_be_marked);
        return res.status(202).json(api_response);
    }

    // mark the todo as done
    to_be_marked.done = true
    to_be_marked.updatedAt = new Date().toISOString();

    // write the updated data 
    await write_db(data);

    console.log("[Controller] Marked Todo as Done successfully.");
    const api_response = new ApiResponse(200,"Successfully marked Todo as done",to_be_marked);
    res.status(200).json(api_response);
});



export {
    landing,
    add_todo,
    fetch_todo,
    update_todo,
    delete_todo,
    markDone_todo
}