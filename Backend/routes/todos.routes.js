import { Router } from "express"
import { landing, add_todo, fetch_todo, update_todo, delete_todo, markDone_todo } from "../controllers/todo.controllers.js";

const router = Router();


router.route("/").get(landing)                  //Endpoint = localhost:3000/api/v1/todos/
router.route("/create").post(add_todo)          //Endpoint = localhost:3000/api/v1/todos/create
router.route("/fetch").get(fetch_todo)          //Endpoint = localhost:3000/api/v1/todos/fetch || localhost:3000/api/v1/todos/fetch?id=1722608137096 || localhost:3000/api/v1/todos/fetch?sort=byCreatedDate.oldest
router.route("/update").patch(update_todo)      //Endpoint = localhost:3000/api/v1/todos/update
router.route("/delete").delete(delete_todo)     //Endpoint = localhost:3000/api/v1/todos/delete
router.route("/mark").patch(markDone_todo)      //Endpoint = localhost:3000/api/v1/todos/mark

export default router;