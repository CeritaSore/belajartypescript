import type { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import type { Apiresponses } from "../../interfaces/ApiresponsesInterface";

class borrowcontroller {
    async index(request: Request, response: Response) {
        const data = await prisma.borrows.findMany();
        const responses: Apiresponses<any> = {
            message: "success",
            code: 200,
            value: data.length == 0 ? "There is no data" : data
        }
        return response.status(responses.code).json(responses);
    }
    // async store(request:Request,response:Response) {
    //     const 
    // }
}
const BorrowController = new borrowcontroller();
export default BorrowController;