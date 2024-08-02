import express from "express"
import cors from "cors"
import ApiError from "./utils/ApiError.js"

// Initilizing an express app
const app = express()



// Middlewares Init

// Middleware for CORS (allows all CORS requests)
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}));

// middleware of express to accept json object with limits
app.use(express.json({
    limit:"16kb"
}));


// url parser middleware for data incoming from urls, also with limits
app.use(express.urlencoded({
    extended:true,  
    limit: "16kb"
}));




// Importing routes
import todoRoutes from "./routes/todos.routes.js"



// Routes forwarding
app.use('/api/v1/todos', todoRoutes);




// Middleware to handle unmatched requests
app.all("/api/v1/todos/*", (req,res,next) => {
    console.log(req.originalUrl);
    next( new ApiError(404,`${req.originalUrl} not found. Check your url`) );
});




// Global error handler middleware
app.use((err, req, res, next) => {
    console.log("[Global Error Handler] Global Error Handler Called");
    console.log(err)
    
    if (!(err instanceof ApiError)) {
        // Wrap the error in an ApiError instance if it is not already one
        err = new ApiError(
            500,
            err.msg || "Global Error Handler default Server error message",
            [],
            err.stack
        );
    }

    res.status(err.statusCode).json(err);
});


export default app;