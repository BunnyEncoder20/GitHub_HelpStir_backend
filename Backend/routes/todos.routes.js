import { Router } from "express"
import { landing, add_todo, fetch_todo } from "../controllers/todo.controllers.js";

const router = Router();


router.route("/").get(landing)                  //Endpoint = localhost:8000/api/v1/todos/
router.route("/create").post(add_todo)          //Endpoint = localhost:8000/api/v1/todos/create
router.route("/fetch").get(fetch_todo)          //Endpoint = localhost:8000/api/v1/todos/fetch

export default router;