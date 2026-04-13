import express, { type Request, type Response } from "express";
import BookController from "../controller/BooksController.js";
import { body } from "express-validator";
export const router = express();
router.use(express.json());
router.get("/", (request: Request, response: Response) => {
  response.json("halo");
});
router.get("/books", body('name'), BookController.index);
router.post("/books/create", BookController.store);
router.get("/books/:id", BookController.show);
router.patch("/books/:id/update", BookController.update);
router.delete("/books/:id/delete", BookController.destroy);