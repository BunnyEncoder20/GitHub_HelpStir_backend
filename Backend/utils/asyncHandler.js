// Wrapper for dealing with errors in async functions

const asyncHandler = (async_func) => {
    return (req,res,next) => {
        Promise.resolve(async_func(req,res.next))   // Execute the function and resolve the promise with that returned value
        .catch((err)=>next(err));                   // If any error occurs within the Promise, .catch that and pass to next (global error handler) 
    }
}

export default asyncHandler ;


// doing the same thing using try catch (and implicit return)

// const asyncHandler = (async_func) => async(req,res,next) => {
//     try {
//         await async_func(req,res,next)
//     }
//     catch(erorr){
//         throw new ApiError(500,error.message);
//     }
// }