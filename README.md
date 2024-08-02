# GitHub HelpStir Backend - Todo List Application with NodeJS 

Todo App Backend Project Made for the HelpStir Backend Intern Position Qualification round

<br><br>

## System Design Overview

### 1. Architecture
- **Frameworks**: The application uses `Node.js` with `Express.js` to handle API routes and middleware for managing HTTP requests and responses.
- **Data Storage**: Todos are stored in a raw `.json` file within which the data is formatted as `JSON` array of objects.

<br>

### 2. API Endpoints
- **Fetch Todos**
    - **Description**: Retrieves a list of all todo items. Supports optional query parameters for searching and sorting (e.g., by date of last update) sent through params. 
    - **Endpoints**: 
```
localhost:3000/api/v1/todos/fetch
localhost:3000/api/v1/todos/fetch?id=1722608137096
localhost:3000/api/v1/todos/fetch?sort=byCreatedDate.oldest
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
- **ApiError Class**: Proper ApiError Class for standardized error responses back.
- **Status Codes**: The API responds with relevant HTTP status codes to indicate the success or failure of operations.

<br><br>

## Explaination of Implementation 

## Instructions on Setting up and Running application
