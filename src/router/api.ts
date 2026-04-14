import express, { type Request, type Response } from "express";
import BookController from "../controller/BooksController.js";
import { body } from "express-validator";
import UsersController from "../controller/UsersController.js";
export const router = express();
router.use(express.json());
router.get("/", (request: Request, response: Response) => {
  response.json("halo");
});
router.get("/books", BookController.index);
router.post("/books/create", BookController.store);
router.get("/books/:id", BookController.show);
router.patch("/books/:id/update", BookController.update);
router.delete("/books/:id/delete", BookController.destroy);

router.get("/users", UsersController.index);
router.post("/users/create", UsersController.store);
router.get("/users/:id", UsersController.show);
