import Joi from "joi";
import { batterySchema } from "../Entity/Battery";
import { ValidatorResponse } from "../Type/All";
import { PrismaConnection } from "../Utils/PrismaConnection";
import { BaseService } from "./BaseService";

/**
 * @class BatteryService
 * @description Service for Battery
 * @exports BatteryService
 *
 */
export class BatteryService extends BaseService {
  /**
   * @method validate
   * @description Validate Battery
   * @memberof BatteryService
   * @param {Request} req - The Request.
   * @returns {Promise<Joi.ValidationResult>} - A Promise that resolves to a Joi.ValidationResult.
   * @async
   */
  public async validate(req: any): Promise<ValidatorResponse> {
    const schema = Joi.object({
      name: Joi.string().required().min(3).max(100),
      description: Joi.string().required().min(3),
      price: Joi.number().required(),
      power: Joi.number().required(),
      capacity: Joi.number().required(),
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
   * @description Create a new Battery
   * @memberof BatteryService
   * @param {Request} req - The Request.
   * @returns {Promise<Response>} - A Promise that resolves to a Response.
   * @async
   */
  public async create(req: any): Promise<any> {
    const prisma = PrismaConnection.getInstance();
    return await prisma.battery.create({
      data: {
        name: req.name,
        description: req.description,
        price: req.price,
        capacity: req.capacity,
        power: req.power,
        finishes: {
          connect: req.finishes.map((finishId: number) => ({ id: finishId })),
        },
      },
      select: batterySchema,
    });
  }

  /**
   * @method findOne
   * @description Find a Battery by id
   * @memberof BatteryService
   * @param {number} id - The id.
   * @returns {Promise<any>} - A Promise that resolves to a Response.
   * @async
   */
  public async findOne(id: number): Promise<any> {
    const prisma = PrismaConnection.getInstance();
    return await prisma.battery.findUnique({
      select: batterySchema,
      where: {
        id: id,
      },
    });
  }

  /**
   * @method findAll
   * @description Find all Batterys
   * @memberof BatteryService
   * @returns {Promise<any>} - A Promise that resolves to a Response.
   * @async
   */
  public async findAll(): Promise<any> {
    const prisma = PrismaConnection.getInstance();
    return await prisma.battery.findMany({
      select: batterySchema,
    });
  }

  /**
   * @method update
   * @description Update a Battery
   * @memberof BatteryService
   * @param {number} id - The id.
   * @returns {Promise<any>} - A Promise that resolves to a Response.
   * @async
   */
  public async update(id: number, req: any): Promise<any> {
    const prisma = PrismaConnection.getInstance();
    return await prisma.battery.update({
      where: {
        id: id,
      },
      data: {
        name: req.name,
        description: req.description,
        price: req.price,
        capacity: req.capacity,
        power: req.power,
        finishes: {
          connect: req.finishes.map((finishId: number) => ({ id: finishId })),
        },
      },
      select: batterySchema,
    });
  }

  /**
   * @method delete
   * @description Delete a Battery
   * @memberof BatteryService
   * @param {number} id - The id.
   * @returns {Promise<any>} - A Promise that resolves to a Response.
   * @async
   */
  public async delete(id: number): Promise<any> {
    const prisma = PrismaConnection.getInstance();
    return await prisma.battery.delete({
      where: {
        id: id,
      },
    });
  }
}
