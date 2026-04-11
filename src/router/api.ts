import express, { type Request, type Response } from "express";
import BookController from "../controller/BooksController.js";
export const router = express();
router.use(express.json());
router.get("/", (request: Request, response: Response) => {
  response.json("halo");
});
router.get("/books", BookController.index);
router.get("/books/:id", BookController.show);
router.post("/books/create", BookController.store);
