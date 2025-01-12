import Joi from "joi";
import { finishSchema } from "../Entity/Finish";
import { ValidatorResponse } from "../Type/All";
import { PrismaConnection } from "../Utils/PrismaConnection";
import { BaseService } from "./BaseService";

/**
 * @class FinishService
 * @description Service for Finish
 * @exports FinishService
 *
 */
export class FinishService extends BaseService {
  /**
   * @method validate
   * @description Validate Finish
   * @memberof FinishService
   * @param {Request} req - The Request.
   * @returns {Promise<Joi.ValidationResult>} - A Promise that resolves to a Joi.ValidationResult.
   * @async
   */
  public async validate(req: any): Promise<ValidatorResponse> {
    const schema = Joi.object({
      name: Joi.string().required().min(3).max(100),
      description: Joi.string().required().min(3),
      price: Joi.number().required(),
      models: Joi.array().items(Joi.number()),
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
   * @description Create a new Finish
   * @memberof FinishService
   * @param {Request} req - The Request.
   * @returns {Promise<Response>} - A Promise that resolves to a Response.
   * @async
   */
  public async create(req: any): Promise<any> {
    const prisma = PrismaConnection.getInstance();
    return await prisma.finish.create({
      data: {
        name: req.name,
        description: req.description,
        price: req.price,
        models: {
          connect: req.models.map((modelId: number) => ({ id: modelId })),
        },
      },
      select: finishSchema,
    });
  }

  /**
   * @method findOne
   * @description Find a Finish by id
   * @memberof FinishService
   * @param {number} id - The id.
   * @returns {Promise<any>} - A Promise that resolves to a Response.
   * @async
   */
  public async findOne(id: number): Promise<any> {
    const prisma = PrismaConnection.getInstance();
    return await prisma.finish.findUnique({
      select: finishSchema,
      where: {
        id: id,
      },
    });
  }

  /**
   * @method findAll
   * @description Find all Finishs
   * @memberof FinishService
   * @returns {Promise<any>} - A Promise that resolves to a Response.
   * @async
   */
  public async findAll(): Promise<any> {
    const prisma = PrismaConnection.getInstance();
    return await prisma.finish.findMany({
      select: finishSchema,
    });
  }

  /**
   * @method update
   * @description Update a Finish
   * @memberof FinishService
   * @param {number} id - The id.
   * @returns {Promise<any>} - A Promise that resolves to a Response.
   * @async
   */
  public async update(id: number, req: any): Promise<any> {
    const prisma = PrismaConnection.getInstance();
    return await prisma.finish.update({
      where: {
        id: id,
      },
      data: {
        name: req.name,
        description: req.description,
        price: req.price,
        models: {
          connect: req.models.map((modelId: number) => ({ id: modelId })),
        },
      },
      select: finishSchema,
    });
  }

  /**
   * @method delete
   * @description Delete a Finish
   * @memberof FinishService
   * @param {number} id - The id.
   * @returns {Promise<any>} - A Promise that resolves to a Response.
   * @async
   */
  public async delete(id: number): Promise<any> {
    const prisma = PrismaConnection.getInstance();
    return await prisma.finish.delete({
      where: {
        id: id,
      },
    });
  }
}
