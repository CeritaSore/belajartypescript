import type { Request, Response } from "express";
import { Books } from "../models/Books.js";
import type { Apiresponses } from "../../interfaces/ApiresponsesInterface.js";

class BooksController {
  index(request: Request, response: Response) {
    const book = Books;
    const responses: Apiresponses<typeof book> = {
      message: "Success",
      code: 200,
      value: book,
    };
    response.json(responses);
  }
  show(request: Request, response: Response) {
    const id = request.params.id;
    const book = Books.find((book) => book.id === Number(id));
    const responses: Apiresponses<typeof book> = {
      message: "success",
      code: 200,
      value: book,
    };
    response.json(responses);
  }
  store(request: Request, response: Response) {
    const { name, author } = request.body;
    const newBook = {
      id: Books.length + 1,
      name,
      author,
    };
    const data: Apiresponses<typeof newBook> = {
      message: "data ditambahkan",
      code: 201,
      value: newBook,
    };
    response.json(data);
  }
  update(request: Request, response: Response) {}
}
const BookController = new BooksController();
export default BookController;
