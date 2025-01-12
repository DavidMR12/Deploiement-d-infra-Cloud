import Joi from "joi";
import { ValidatorResponse } from "../Type/All";
import { PrismaConnection } from "../Utils/PrismaConnection";
import { BaseService } from "./BaseService";

/**
 * @class ModelService
 * @description Service for Model
 * @exports ModelService
 *
 */
export class ModelService extends BaseService {
  /**
   * @method validate
   * @description Validate Model
   * @memberof ModelService
   * @param {Request} req - The Request.
   * @returns {Promise<Joi.ValidationResult>} - A Promise that resolves to a Joi.ValidationResult.
   * @async
   */
  public async validate(req: any): Promise<ValidatorResponse> {
    const schema = Joi.object({
      name: Joi.string().required().min(3).max(100),
      description: Joi.string().required().min(3),
      price: Joi.number().required(),
      type: Joi.string()
        .required()
        .valid("sedan", "hatch", "suv", "SEDAN", "HATCH", "SUV"),
    });

    return await schema
      .validateAsync(req, {
        abortEarly: false,
      })
      .then(() => {
        return { sucess: true };
      })
      .catch((err) => {
        const resp: ValidatorResponse = { sucess: false, fields: [] };
        // populate each field with its error message
        err.details.forEach((element: any) => {
          resp.fields?.push({
            name: element.path[0],
            message: element.message,
          });
        });
        return resp;
      });
  }

  /**
   * @method create
   * @description Create a new Model
   * @memberof ModelService
   * @param {Request} req - The Request.
   * @returns {Promise<Response>} - A Promise that resolves to a Response.
   * @async
   */
  public async create(req: any): Promise<any> {
    const prisma = PrismaConnection.getInstance();
    return await prisma.model.create({
      data: {
        name: req.name,
        description: req.description,
        price: req.price,
        type: req.type.toUpperCase(),
      },
    });
  }

  /**
   * @method findOne
   * @description Find a Model by id
   * @memberof ModelService
   * @param {number} id - The id.
   * @returns {Promise<any>} - A Promise that resolves to a Response.
   * @async
   */
  public async findOne(id: number): Promise<any> {
    const prisma = PrismaConnection.getInstance();
    return await prisma.model.findUnique({
      where: {
        id: id,
      },
    });
  }

  /**
   * @method findAll
   * @description Find all Models
   * @memberof ModelService
   * @returns {Promise<any>} - A Promise that resolves to a Response.
   * @async
   */
  public async findAll(): Promise<any> {
    const prisma = PrismaConnection.getInstance();
    return await prisma.model.findMany();
  }

  /**
   * @method update
   * @description Update a Model
   * @memberof ModelService
   * @param {number} id - The id.
   * @returns {Promise<any>} - A Promise that resolves to a Response.
   * @async
   */
  public async update(id: number, req: any): Promise<any> {
    const prisma = PrismaConnection.getInstance();
    return await prisma.model.update({
      where: {
        id: id,
      },
      data: {
        name: req.name,
        description: req.description,
        price: req.price,
        type: req.type.toUpperCase(),
      },
    });
  }

  /**
   * @method delete
   * @description Delete a Model
   * @memberof ModelService
   * @param {number} id - The id.
   * @returns {Promise<any>} - A Promise that resolves to a Response.
   * @async
   */
  public async delete(id: number): Promise<any> {
    const prisma = PrismaConnection.getInstance();
    return await prisma.model.delete({
      where: {
        id: id,
      },
    });
  }
}
