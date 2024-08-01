import { Router } from "express"
import { create_todo } from "../controllers/todo.controllers.js";

const router = Router();


router.route("/").get()                         //Endpoint = 

router.route("/create").post(create_todo)       //Endpoint = localhost:8000/api/v1/todos/create

export default router;