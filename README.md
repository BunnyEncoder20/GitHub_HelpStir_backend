# GitHub HelpStir Backend - Todo List Application with NodeJS 

Todo App Backend Project Made for the HelpStir Backend Intern Position Qualification round

<br>


## Instructions on Setting up and Running application

### Prerequisites
- Ensure the following software is installed on your computer:
    - **Node.js** (v14.x or later)
    - **Git**

### Setup Instructions 
1. Clone the Repository
```bash
git clone https://github.com/BunnyEncoder20/GitHub_HelpStir_backend.git
```
2. cd into the cloned dir
```bash
cd GitHub_HelpStir_backend
```
3. Install all the dependencies : 
```bash
npm install
```
4. Make a `.env` file in the root directory of the project and add any required environment variables
```bash
PORT=3000
```

<br>

### Run the Application 
1. Start the application using : 
```bash
npm run start
```
- Or if you want to run it in `dev` mode (runs using nodemon) using : 
```bash
npm run dev
```

### Notes
- `fileDB.json` is the raw text file which is used as the DataBase for this project. It is located within the DB dir.
- `todos.model.json` is simply there for reference of the structure of the data which is being stored.

<br><br>

---

## System Design Overview

### 1. Architecture
- **Frameworks**: The application uses `Node.js` with `Express.js` to handle API routes and middleware for managing HTTP requests and responses, `dotenv` for managing env variables and  `cors` for allowing cross origin requests (just in case).
- **Data Storage**: Todos are stored in a raw `.json` file within which the data is formatted as `JSON` array of objects.

<br>

### 2. API Endpoints
- **Fetch Todos**
    - **Description**: Retrieves a list of all todo items. Supports optional query parameters for searching, sorting (e.g: by creationDate/updationDate) and filtering (filter by date of last update) sent through `query` params. 
    - **Endpoints**: 
```
localhost:3000/api/v1/todos/fetch
localhost:3000/api/v1/todos/fetch?id=1722608137096
localhost:3000/api/v1/todos/fetch?sort=byCreatedDate.oldest
localhost:3000/api/v1/todos/fetch?filter_criteria=before.createdDate&filter_date=2024-08-02T14:34:20.061Z
```

- **Add Todo**
    - **Description**: Adds a new todo item to the list. The request body should include details such as title, description, priority and due date
    - **Endpoint and body**:
```
localhost:3000/api/v1/todos/add

Example of req.body : 
{
    "title":"temp Todo",
    "description":"This is reminder for doing something",
    "dueDate":"2024-08-03T00:10:00.000Z",
    "priority":"high"
}
```


- **Update Todo**:
    - **Description**: Updates an existing todo item identified by its unique ID sent through query. Allows modification of details such as title, description, priority, due date. Just sending the fields which have changed is enough.
    - **Endpoints and body**:
```
localhost:3000/api/v1/todos/update?id=1722608137096

Exmaple of req.body: 
{
    "title":"#10 Study",
    "description":"need to revise frontend also",
    "priority":"low"
}
```


- **Delete Todo**:
    - **Description**: Removes a todo item from the list based on its unique ID sent through query.
    - **Endpoint**:
```
localhost:3000/api/v1/todos/delete?id=1722608137096
```


- **Mark as Done**:
    - **Description**: Marks a specified todo item as completed by ID sent through query params.
    - **Endpoints**:
```
localhost:3000/api/v1/todos/mark?id=1722608137096
```

<br>

### 3. Data Storage

- **Format**: Todos are stored in a JSON format within a json file (in `DB` dir).
- **Operations**: The application reads from and writes to this file to manage todo entries. Operations include checking if the file exists on server start and updating the file on add, update, or delete actions.

<br>

### 4. Code Quality and Scalability
- **Scalability**: The codebase is designed to handle growing amounts of data and user requests efficiently. API routes are clearly defined to ensure organized and scalable route management.
- **Optimizations**: implemented sort ids in DB, implemeted Binary search for (log n) look ups and applied validations to the incoming data through JOI in custom middleware.
- **Error Handling**: The application includes comprehensive and standardized error handling with appropriate `HTTP` **status codes** to manage error cases (e.g., not found, bad request).

<br>

### 5. Error Handling
- **Global Error Handler**: Proper standardized error responses are implemented for various scenarios such as invalid requests, missing data, and internal server errors via Global Error Handler.
- **ApiError Class**: Proper ApiError Class for standardized error responses, with properties like statis codes, erorr message and stack trace.
- **Status Codes**: The API responds with relevant HTTP status codes to indicate the success or failure of operations. 

<br><br>

---

## Explaination of Implementation

### 1. Data Model Planning and Structuring 
1. First step of building robust backend api endpoints is understanding what data are we going to store ?
2. It is important to understand what are the different table, fields and what are their relations
3. For this project, first I made the strucutre in which I needed to store the data and in which format will the fields be. (done in todos.models.json)

### 2. Setting Up backend app
1. Laying a solid foundation for backend, will make the development afterwards much more easier.
2. This phase included initializing the `NodeJS` application and connecting it to `GitHub` repository.
3. Making proper `dir` structures (controllers, db, middlewares, models, routes, utils) and root dir files (index.js, constants.js, app.js)
4. Installing required base packages (express, cors, dotenv) and dev dependencies like `nodemon`.
5. Making necessary configurations in the `package.json` (setting type to modules, making start and dev scripts, etc)
6. Coding the initial `index.js` and `app.js` files. Importing the global middlewares in the `app.js`
7. Writing utility codes such as ApiResponse, ApiErrorr for standardized API responses.
8. Also coded asyncHandler wrapper for catching any errors which occur during an async function (to avoid writing try-catch blocks in very function)

### 3. Coding the Functionality of API
1. Finally I can start writing the actual logic of the api endpoints. 
2. Created the `todo.routes.js` here and imported that into the `app.js` to create the standardized api route
3. Defined all the api endpoints which were required in the `todo.routes.js`. 
4. Starting coding the controllers functions. Lead to the reaction of `db_ops` which was made to perform all the read/write operations to the `fileDB.json`.
5. Used **Postman** to check if all the functionalities of the api endpoints were working properly.

### 4. Applying optimizations
1. After the first implementations of the endpoints were all working. I started working on making the endpoints more robust, adding more error handling and optimized. 
2. Cause of the solid structuring of the backend project, the codbase cause already scalable and easily adaptable. 
3. For efficient look up times, a Binary serach algo was implmented (`bsHandler.js`)
4. Added logic for filtering by dates. (in fetch_todo controller)
5. Also implement data validation middleware (`validation.middleware.js`) using JOI package, which provides very easy validation schemas and proper errors.

---
---