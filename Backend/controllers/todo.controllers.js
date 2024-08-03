import asyncHandler from "../utils/asyncHandler.js"
import ApiResponse from "../utils/ApiResponse.js" 
import ApiError from "../utils/ApiError.js";
import {read_db, write_db} from "../db/db_ops.js"
import binarySearch from "../utils/bsHandler.js";
import { StatusCodes } from "../constants.js";



// Todos Endpoint Landing (no functionality)
const landing = (req,res) => {
    const api_response = new ApiResponse(StatusCodes.OK,"Todo api endpoint working");
    res.status(StatusCodes.OK).json(api_response);
}



// fetch Todos 
const fetch_todo = asyncHandler ( async (req,res) => {
    const data = await read_db();
    const { id, sort, filter_criteria, filter_date } = req.query;

    if (id) {
        console.log(`[Controller] Fetch request received with _id:${id}`);

        // const todo = data.find(todo => todo._id == id);      // O(n) look up
        const todo = binarySearch(data,id);                     // O(log n) look up

        if (!todo){
            throw new ApiError(StatusCodes.NOT_FOUND,"[Controller] Todo not found");
        }
        
        const api_response = new ApiResponse(StatusCodes.OK,"Todo found",todo);
        return res.status(StatusCodes.OK).json(api_response);
    }

    // Creating shallow copy to avoid changing the original data
    let shallow_copy_data = [...data];

    if (sort) {
        console.log(`[Controller] Fetch request received with _sort:${sort}`);

        switch (sort) {
            case "byCreatedDate_oldest":
                shallow_copy_data.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
                break;
            case "byCreatedDate_latest":
                shallow_copy_data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                break;
            case "byUpdatedDate_oldest":
                shallow_copy_data.sort((a, b) => new Date(a.updatedAt) - new Date(b.updatedAt));
                break;
            case "byUpdatedDate_latest":
                shallow_copy_data.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
                break;
            default:
                console.error(`[Controller] The sorting criteria "${sort}" is not correct`);
                throw new ApiError(StatusCodes.UNPROCESSABLE, "The sorting criteria given is not correct");
        }
    }

    if (filter_criteria) {
        if (!filter_date){
            throw new ApiError(StatusCodes.UNPROCESSABLE, "Recieved request for filtering without filter_date")
        }

        console.log(`[Controller] Fetch request received with \n_filter:${filter_criteria} \n_filterDate:${filter_date}`);
        
        switch (filter_criteria) {
            case "before_createdDate":
                shallow_copy_data = data.filter((todo) => new Date(todo.createdAt) < new Date(filter_date));
                break;
            case "after_createdDate":
                shallow_copy_data = data.filter((todo) => new Date(todo.createdAt) >= new Date(filter_date));
                break;
            case "before_updatedDate":
                shallow_copy_data = data.filter((todo) => new Date(todo.updatedAt) < new Date(filter_date));
                break;
            case "after_updatedDate":
                shallow_copy_data = data.filter((todo) => new Date(todo.updatedAt) >= new Date(filter_date));
                break;
            default:
                console.error(`[Controller] The filtering criteria ${filter} is not corrent`);
                throw new ApiError(StatusCodes.UNPROCESSABLE, "The filtering criteria is not correct ");
        }
    }
    
    console.log(`[Controller] Successfully fetched todos`);
    const api_response = new ApiResponse(StatusCodes.OK, "Successfully fetched todos", shallow_copy_data);
    res.status(StatusCodes.OK).json(api_response);
});



// adds a new todo
const add_todo = asyncHandler(async (req,res) => {
    const {title,description,dueDate,priority} = req.body;

    console.log(`[Controller] Add todo request received for "${title}"`);
    // console.table([title,description,done,dueDate,priority]);

    const data = await read_db();

    let new_todo = {
        _id : Date.now(),
        title,
        description,
        done : false,
        dueDate,
        priority,
        createdAt : new Date().toISOString(),
        updatedAt : new Date().toISOString() 
    };

    data.push(new_todo);
    await write_db(data);
    
    console.log(`[Controller] Todo created with _id:${new_todo._id}`);
    const api_response = new ApiResponse(StatusCodes.CREATED,"Successfully created new todo",new_todo);
    res.status(StatusCodes.CREATED).json(api_response);
});



// Update Todo
const update_todo = asyncHandler( async (req,res) => {
    const data = await read_db()
    const updated_todo = req.body;
    const { id } = req.query;

    console.log(`[Controller] Update request received for _id:${id}`);

    // let old_todo = data.find((todo) => todo._id == id);
    let old_todo = binarySearch(data, id);                  // O(log n) look up
    if (!old_todo){
        throw new ApiError(StatusCodes.NOT_FOUND,"[Controller] Todo not found");
    }

    // updating the old todo object
    updated_todo.updatedAt = new Date().toISOString();
    Object.assign(old_todo, updated_todo);

    // writing date back
    await write_db(data);

    console.log("[Controller] Updated Todo successfully.");
    const api_response = new ApiResponse(StatusCodes.OK,"Successfully updated Todo",old_todo);
    res.status(StatusCodes.OK).json(api_response);
});



// Delete Todo
const delete_todo = asyncHandler( async (req,res) => {
    const data = await read_db();
    const { id } = req.query;

    console.log(`[Controller] Delete Todo request received for _id:${id}`);

    // Find if the todo exists
    // let to_be_deleted = data.find((todo) => todo._id == id);
    let to_be_deleted = binarySearch(data, id);                 // O(log n) look up
    if (!to_be_deleted) { 
        throw new ApiError(StatusCodes.NOT_FOUND,"The Todo to be deleted not found")
    }

    // created new data array without the deleted one
    const updated_data = data.filter((todo) => todo._id != id);

    // Write the updated data
    await write_db(updated_data);

    console.log("[Controller] Deleted Todo successfully.");
    const api_response = new ApiResponse(StatusCodes.OK,"Successfully Deleted Todo",to_be_deleted);
    res.status(StatusCodes.OK).json(api_response);
});



// Mark Todo as Done
const markDone_todo = asyncHandler( async (req,res) => {
    const data = await read_db();
    const { id } = req.query;
    if (!id) {
        throw new ApiError(StatusCodes.UNPROCESSABLE,"id is required for marking");
    }

    console.log(`[Controller] Mark as done request received for _id:${id}`);

    // Find if the todo exists or already marked as done
    // let to_be_marked = data.find((todo) => todo._id == id);
    let to_be_marked = binarySearch(data, id);                  // O(log n) look up
    if (!to_be_marked) { 
        throw new ApiError(StatusCodes.NOT_FOUND,"The Todo to mark as done not found");
    }
    else if (to_be_marked.done){
        console.log("[Controller] The Todo is already marked as done.");
        const api_response = new ApiResponse(StatusCodes.OK,"The Todo is already marked as done",to_be_marked);
        return res.status(StatusCodes.OK).json(api_response);
    }

    // mark the todo as done
    to_be_marked.done = true
    to_be_marked.updatedAt = new Date().toISOString();

    // write the updated data 
    await write_db(data);

    console.log("[Controller] Marked Todo as Done successfully.");
    const api_response = new ApiResponse(StatusCodes.OK,"Successfully marked Todo as done",to_be_marked);
    res.status(StatusCodes.OK).json(api_response);
});



export {
    landing,
    add_todo,
    fetch_todo,
    update_todo,
    delete_todo,
    markDone_todo
}