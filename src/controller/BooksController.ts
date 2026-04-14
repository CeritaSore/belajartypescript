import type { Request, Response } from "express";
import type { Apiresponses } from "../../interfaces/ApiresponsesInterface.js";
import { prisma } from "../lib/prisma.js";
import zodValidation from "zod"
class BooksController {
  async index(request: Request, response: Response) {
    const allbooks = await prisma.books.findMany()
    const statusMessage = allbooks.length == 0 ? "Empty Data" : "Getting Data"
    const responses: Apiresponses<typeof allbooks> = {
      message: statusMessage,
      code: 200,
      value: allbooks
    }
    response.json(responses)
  }
  async store(request: Request, response: Response) {
    const { name, author } = request.body;
    const validation = zodValidation.object({
      name: zodValidation.string().min(1, "Field Name Required"),
      author: zodValidation.string().min(1, " Field Author Required")
    })
    const validate = validation.safeParse(request.body);
    if (!validate.success) {
      const errorResponse: Apiresponses<any> = {
        message: "error",
        code: 400,
        value: validate.error.format()
      }
      return response.json(errorResponse);
    }
    const newBook = await prisma.books.create({
      data: {
        name: name,
        author: author
      }
    })
    const responses: Apiresponses<typeof newBook> = {
      message: "success",
      code: 201,
      value: newBook
    }
    response.json(responses)
  }
  async show(request: Request, response: Response) {
    const id = Number(request.params.id)
    const getSpecificData = await prisma.books.findFirst({
      where: {
        id: id
      }
    })
    const message = !getSpecificData ? "Empty Data" : "Get Data"
    const responses: Apiresponses<typeof getSpecificData> = {
      message: message,
      code: 200,
      value: getSpecificData
    }
    response.json(responses);
  }
  async update(request: Request, response: Response) {
    const id = Number(request.params.id)
    const { name, author } = request.body;
    const getSpecificData = await prisma.books.findFirst({
      where: {
        id: id
      }
    })
    if (!getSpecificData) {
      const errorResponse: Apiresponses<any> = {
        message: "Error",
        code: 404,
        value: "data is not found"
      }
      return response.json(errorResponse)
    }
    const updateBook = await prisma.books.update({
      where: {
        id: id
      },
      data: {
        name: name,
        author: author
      }
    })
    const responses: Apiresponses<typeof updateBook> = {
      message: "success",
      code: 201,
      value: updateBook
    }
    return response.json(responses)
  }
  async destroy(request: Request, response: Response) {
    const id = Number(request.params.id)
    const getSpecificData = await prisma.books.findFirst({
      where: {
        id: id
      }
    })
    if (!getSpecificData) {
      const errorResponse: Apiresponses<any> = {
        message: "error",
        code: 404,
        value: "Data is not found"
      }
      return response.json(errorResponse)
    }
    const destroyData = await prisma.books.delete({
      where: {
        id: id
      }
    })
    const responses: Apiresponses<any> = {
      message: "success", code: 201, value: "data has been destroyed"
    }
    return response.status(200).json(responses)
  }
}
const BookController = new BooksController();
export default BookController;
