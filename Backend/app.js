import express from "express"
import cors from "cors"

// Initilizing an express app
const app = express()



// Middlewares Init

// Middleware for CORS (allows all CORS requests)
// This is where you'd usually set up your requests which should be allowed or not 
// Eg: Allowing only the frontend origin requests 
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}));

// middleware of express to accept json object with limits
app.use(express.json({
    limit:"16kb"
}))

// url parser middleware for data incoming from urls, also with limits
app.use(express.urlencoded({
    extended:true,  // for nested objects (generally not required)
    limit: "16kb"
}))


// Importing routes


// Routes declaratios 
// standardized api route : 


export default app;