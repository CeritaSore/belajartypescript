import express, { type Request, type Response } from "express";
import BookController from "../controller/BooksController.js";
import cors from "cors"
import UsersController from "../controller/UsersController.js";
import BorrowController from "../controller/BorrowController.js";
export const router = express();
router.use(cors({
  origin: 'http://localhost:5173', // URL project Vue kamu
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
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
router.patch("/users/:id/update", UsersController.update);
router.delete("/users/:id/delete", UsersController.destroy);

router.get("/borrows", BorrowController.index);
