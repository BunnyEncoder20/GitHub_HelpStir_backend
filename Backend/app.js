import express from "express"
import cors from "cors"
import ApiResponse from "./utils/ApiResponse.js";

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



// Routes declaratios 
// app.use('/api/v1/',(req,res)=>{
//     const api_response = new ApiResponse(200,"Default Route : basic api response is working.",{"api_endpoint":"version1"});
//     res.status(api_response.statusCode).json(api_response);
// })

// standardized api route : `/api/v1/${routes_group}/${route}`
app.use('/api/v1/todos', todoRoutes);




export default app;