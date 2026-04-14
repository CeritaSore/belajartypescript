import type { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import type { Apiresponses } from "../../interfaces/ApiresponsesInterface";
import { hash } from "../lib/HashPassword";
import { id } from "zod/locales";

class usercontroller {
  async index(request: Request, response: Response) {
    const users = await prisma.users.findMany();
    const statusMessage = users.length == 0 ? "Empty Data" : "Getting Data";
    const responses: Apiresponses<typeof users> = {
      message: statusMessage,
      code: 200,
      value: users,
    };
    response.json(responses);
  }
  async store(request: Request, response: Response) {
    const { name, email, password } = request.body;
    const checkuser = await prisma.users.findUnique({
      where: {
        email: email,
      },
    });
    if (checkuser) {
      const errorResponse: Apiresponses<any> = {
        message: "error",
        code: 400,
        value: "User Already Exist",
      };
      return response.status(400).json(errorResponse);
    }
    const hashedpassword = await hash(password);

    const data = await prisma.users.create({
      data: {
        name: name,
        email: email,
        password: hashedpassword,
      },
    });
    const responses: Apiresponses<typeof data> = {
      message: "success",
      code: 201,
      value: data,
    };
    return response.status(200).json(responses);
  }
  async show(request: Request, response: Response) {
    const id: number = Number(request.params.id);
    const getSpecificData = await prisma.users.findFirst({
      where: {
        id: id,
      },
    });
    const statusMessage = getSpecificData
      ? "Getting user data"
      : "User Not Found";
    const code = getSpecificData ? 200 : 404;
    const responses: Apiresponses<typeof getSpecificData> = {
      message: statusMessage,
      code: code,
      value: getSpecificData,
    };
    return response.status(code).json(responses);
  }
  async update(request: Request, response: Response) {
    const { name, email, password } = request.body;
    const currentData = await prisma.users.findFirst({
      where: {
        id: Number(request.params.id),
      },
    });
    if (!currentData) {
      const errorResponse: Apiresponses<string> = {
        message: "error",
        code: 404,
        value: "Data Not Found",
      };
      return response.status(errorResponse.code).json(errorResponse);
    }
    const updating: any = {};
    if (name !== undefined) {
      updating.name = name;
    }
    if (email !== undefined) {
      updating.email = email;
    }
    if (password !== undefined) {
      updating.password = await hash(password);
    }
    const data = await prisma.users.update({
      where: {
        id: currentData.id,
      },
      data: updating,
    });
    const successResponses: Apiresponses<typeof data> = {
      message: "succes",
      code: 202,
      value: data,
    };
    response.status(successResponses.code).json(successResponses);
  }
  async destroy(request: Request, response: Response) {
    const currentData = await prisma.users.findFirst({
      where: {
        id: Number(request.params.id),
      },
    });
    if (!currentData) {
      const errorResponse: Apiresponses<any> = {
        message: "error",
        code: 404,
        value: "Data Not Found",
      };
      return response.status(errorResponse.code).json(errorResponse);
    }
    await prisma.users.delete({
      where: {
        id: currentData.id,
      },
    });
    const successResponses: Apiresponses<any> = {
      message: "success",
      code: 200,
      value: "Data has been deleted",
    };
    return response.status(successResponses.code).json(successResponses);
  }
}
const UsersController = new usercontroller();
export default UsersController;
