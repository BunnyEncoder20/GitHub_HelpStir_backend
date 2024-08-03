import { Router } from "express"
import { landing, add_todo, fetch_todo, update_todo, delete_todo, markDone_todo } from "../controllers/todo.controllers.js";
import validator from "../middlewares/validation.middleware.js";

const router = Router();


router.route("/").get(landing)                              //Endpoint eg = localhost:3000/api/v1/todos/
router.route("/add").post(validator, add_todo)              //Endpoint eg = localhost:3000/api/v1/todos/add
router.route("/fetch").get(validator, fetch_todo)           //Endpoint eg = localhost:3000/api/v1/todos/fetch || localhost:3000/api/v1/todos/fetch?id=1722608137096 || localhost:3000/api/v1/todos/fetch?sort=byCreatedDate.oldest || localhost:3000/api/v1/todos/fetch?filter_criteria=before.createdDate&filter_date=2024-08-02T14:34:20.061Z
router.route("/update").patch(validator, update_todo)       //Endpoint eg = localhost:3000/api/v1/todos/update?id=1722608137096
router.route("/delete").delete(validator, delete_todo)      //Endpoint eg = localhost:3000/api/v1/todos/delete?id=1722608137096
router.route("/mark").patch(validator, markDone_todo)       //Endpoint eg = localhost:3000/api/v1/todos/mark?id=1722608137096

export default router;