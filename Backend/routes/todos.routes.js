import { Router } from "express"
import { landing, create_todo, fetch_todo } from "../controllers/todo.controllers.js";

const router = Router();


router.route("/").get(landing)                  //Endpoint = localhost:8000/api/v1/todos/
router.route("/create").post(create_todo)       //Endpoint = localhost:8000/api/v1/todos/create
router.route("/fetchall").get(fetch_todo)       //Endpoint = localhost:8000/api/v1/todos/fetchall

export default router;