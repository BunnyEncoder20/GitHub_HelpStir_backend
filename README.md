# GitHub_HelpStir_backend

- Todo App Backend Project Made for the HelpStir Backend Intern Position Qualification round

---

## Installations 

The most important thing for any good backend, is to have **proper structure and set up** before proceeding to add anything to code the actual project.

1. Initializing Project
```
npm init
```

2. Express package
```
npm install express
```

3. Nodemon (installed as a dev dependency)
```
npm install nodemon -D
```

4. dotenv
```
npm i dotenv
```

5. CORS package
```
npm install cors
```
- For allowing Cross Origin Requests. 
- For now, allowing all cross-origin request, but can whitelist only some, using cors config options.
- **Though not requried** for the *just* backend, it's part of the backend structure and init configurations.

--- 

## Utils Files

Inside the utils folder created basic production utitility files for : 
1. Async Function Error Handling : `asyncHandler.js`
2. Standardized ApiResponses : `ApiResponse.js`
3. Standardized ApiErrors : `ApiError.js`

Also created Function for Global Error Handling in `app.js`

---

## Package Json File Settings

1. Added **start** script for starting the `index.js` file.
2. Added **dev** script for starting nodemon for hot reloading of the server.
3. Added **type:module** property for telling browser to import in module style.
4. Added **--experimental-json-modules** flag for allowing of json module importing feature