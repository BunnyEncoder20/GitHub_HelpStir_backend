# GitHub HelpStir Backend - Todo List Application with NodeJS 

Todo App Backend Project Made for the HelpStir Backend Intern Position Qualification round

<br><br>

## System Design Overview

### 1. Architecture
- **Frameworks**: The application uses `Node.js` with `Express.js` to handle API routes and middleware for managing HTTP requests and responses, `dotenv` for managing env variables and  `cors` for allowing cross origin requests (just in case).
- **Data Storage**: Todos are stored in a raw `.json` file within which the data is formatted as `JSON` array of objects.

<br>

### 2. API Endpoints
- **Fetch Todos**
    - **Description**: Retrieves a list of all todo items. Supports optional query parameters for searching, sorting (e.g: by creationDate/updationDate) and filtering (filter by date of last update) sent through params. 
    - **Endpoints**: 
```
localhost:3000/api/v1/todos/fetch
localhost:3000/api/v1/todos/fetch?id=1722608137096
localhost:3000/api/v1/todos/fetch?sort=byCreatedDate.oldest
localhost:3000/api/v1/todos/fetch?filter_criteria=before.createdDate&filter_date=2024-08-02T14:34:20.061Z
```

- **Add Todo**
    - **Description**: Adds a new todo item to the list. The request body should include details such as title, description, priority, due date, and initial completion status.
    - **Endpoints**:
```
localhost:3000/api/v1/todos/add
```


- **Update Todo**:
    - **Description**: Updates an existing todo item identified by its unique ID. Allows modification of details such as title, description, priority, due date, and completion status.
    - **Endpoints**:
```
localhost:3000/api/v1/todos/update?id=1722608137096
```


- **Delete Todo**:
    - **Description**: Removes a todo item from the list based on its unique ID.
    - **Endpoint**:
```
localhost:3000/api/v1/todos/delete?id=1722608137096
```


- **Mark as Done**:
    - **Description**: Marks a specified todo item as completed.
    - **Endpoints**:
```
localhost:3000/api/v1/todos/mark?id=1722608137096
```

<br>

### 3. Data Storage

- **Format**: Todos are stored in a JSON format within a json file.
- **Operations**: The application reads from and writes to this file to manage todo entries. Operations include checking if the file exists on server start and updating the file on add, update, or delete actions.

<br>

### 4. Code Quality and Scalability
- **Scalability**: The codebase is designed to handle growing amounts of data and user requests efficiently. API routes are clearly defined to ensure organized and scalable route management.
- **Optimizations**:
- **Error Handling**: The application includes comprehensive and standardized error handling with appropriate `HTTP` **status codes** to manage error cases (e.g., not found, bad request).

<br>

### 5. Error Handling
- **Global Error Handler**: Proper standardized error responses are implemented for various scenarios such as invalid requests, missing data, and internal server errors via Global Error Handler.
- **ApiError Class**: Proper ApiError Class for standardized error responses, with properties like statis codes, erorr message and stack trace.
- **Status Codes**: The API responds with relevant HTTP status codes to indicate the success or failure of operations. 

<br><br>

## Explaination of Implementation



<br><br>

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
2. Cd into the cloned dir
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