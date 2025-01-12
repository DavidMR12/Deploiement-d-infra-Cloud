import Joi from "joi";
import { colorSchema } from "../Entity/Color";
import { ValidatorResponse } from "../Type/All";
import { PrismaConnection } from "../Utils/PrismaConnection";
import { BaseService } from "./BaseService";

/**
 * @class ColorService
 * @description Service for Color
 * @exports ColorService
 *
 */
export class ColorService extends BaseService {
  /**
   * @method validate
   * @description Validate Color
   * @memberof ColorService
   * @param {Request} req - The Request.
   * @returns {Promise<Joi.ValidationResult>} - A Promise that resolves to a Joi.ValidationResult.
   * @async
   */
  public async validate(req: any): Promise<ValidatorResponse> {
    const schema = Joi.object({
      name: Joi.string().required().min(3).max(100),
      description: Joi.string().required().min(3),
      price: Joi.number().required(),
      code: Joi.string().max(3).required(),
      hexa: Joi.string()
        .max(6)
        .required()
        .pattern(new RegExp("^[0-9A-Fa-f]+$")),
      finishes: Joi.array().items(Joi.number()),
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
   * @description Create a new Color
   * @memberof ColorService
   * @param {Request} req - The Request.
   * @returns {Promise<Response>} - A Promise that resolves to a Response.
   * @async
   */
  public async create(req: any): Promise<any> {
    const prisma = PrismaConnection.getInstance();
    return await prisma.color.create({
      data: {
        name: req.name,
        description: req.description,
        price: req.price,
        code: req.code,
        hexa: req.hexa,
        finishes: {
          connect: req.finishes.map((finishId: number) => ({ id: finishId })),
        },
      },
      select: colorSchema,
    });
  }

  /**
   * @method findOne
   * @description Find a Color by id
   * @memberof ColorService
   * @param {number} id - The id.
   * @returns {Promise<any>} - A Promise that resolves to a Response.
   * @async
   */
  public async findOne(id: number): Promise<any> {
    const prisma = PrismaConnection.getInstance();
    return await prisma.color.findUnique({
      select: colorSchema,
      where: {
        id: id,
      },
    });
  }

  /**
   * @method findAll
   * @description Find all Colors
   * @memberof ColorService
   * @returns {Promise<any>} - A Promise that resolves to a Response.
   * @async
   */
  public async findAll(): Promise<any> {
    const prisma = PrismaConnection.getInstance();
    return await prisma.color.findMany({
      select: colorSchema,
    });
  }

  /**
   * @method update
   * @description Update a Color
   * @memberof ColorService
   * @param {number} id - The id.
   * @returns {Promise<any>} - A Promise that resolves to a Response.
   * @async
   */
  public async update(id: number, req: any): Promise<any> {
    const prisma = PrismaConnection.getInstance();
    return await prisma.color.update({
      where: {
        id: id,
      },
      data: {
        name: req.name,
        description: req.description,
        price: req.price,
        code: req.code,
        hexa: req.hexa,
        finishes: {
          connect: req.finishes.map((finishId: number) => ({ id: finishId })),
        },
      },
      select: colorSchema,
    });
  }

  /**
   * @method delete
   * @description Delete a Color
   * @memberof ColorService
   * @param {number} id - The id.
   * @returns {Promise<any>} - A Promise that resolves to a Response.
   * @async
   */
  public async delete(id: number): Promise<any> {
    const prisma = PrismaConnection.getInstance();
    return await prisma.color.delete({
      where: {
        id: id,
      },
    });
  }
}
