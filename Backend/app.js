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


// Global error handler middleware
app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Global Error Handler default Server error message";
    console.log("[Global Error Handler] : ",err.message);
    console.log(err);
    res.status(err.statusCode).json(err);
});


export default app;