// Wrapper for dealing with errors in async functions

const asyncHandler = (async_func) => {
    return (req,res,next) => {
        async_func(req,res,next).catch((err)=>next(err));                   
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