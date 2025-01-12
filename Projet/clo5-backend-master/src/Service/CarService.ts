import Joi from "joi";
import {
  BatteryConfigure,
  CarConfigured,
  CarConfiguredResponse,
  ColorConfigure,
  FinishConfigure,
  carConfigureSchema,
  carSchema,
} from "../Entity/Car";
import { Response, ValidatorResponse } from "../Type/All";
import { PrismaConnection } from "../Utils/PrismaConnection";
import { BaseService } from "./BaseService";

/**
 * @class CarService
 * @description Service for Car
 * @exports CarService
 *
 */
export class CarService extends BaseService {
  /**
   * @method validate
   * @description Validate Car
   * @memberof CarService
   * @param {Request} req - The Request.
   * @returns {Promise<Joi.ValidationResult>} - A Promise that resolves to a Joi.ValidationResult.
   * @async
   */
  public async validate(req: any): Promise<ValidatorResponse> {
    const schema = Joi.object({
      code: Joi.string()
        .required()
        .min(3)
        .max(3)
        .pattern(new RegExp("^[A-Z]{3}$")),
      model: Joi.number().required(),
      finish: Joi.number().required(),
      battery: Joi.number().required(),
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

  public async validateConfigure(req: any): Promise<ValidatorResponse> {
    const schema = Joi.object({
      model: Joi.number().required(),
      finish: Joi.number().empty(""),
      battery: Joi.number().empty(""),
      color: Joi.number().empty(""),
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
   * @description Create a new Car
   * @memberof CarService
   * @param {Request} req - The Request.
   * @returns {Promise<Response>} - A Promise that resolves to a Response.
   * @async
   */
  public async create(req: any): Promise<any> {
    const prisma = PrismaConnection.getInstance();
    return await prisma.car.create({
      data: {
        code: req.code,
        model: {
          connect: {
            id: req.model,
          },
        },
        finish: {
          connect: {
            id: req.finish,
          },
        },
        battery: {
          connect: {
            id: req.battery,
          },
        },
      },
      select: carSchema,
    });
  }

  /**
   * @method findOne
   * @description Find a Car by id
   * @memberof CarService
   * @param {string} idOrCode - The id or code
   * @returns {Promise<any>} - A Promise that resolves to a Response.
   * @async
   */
  public async findOne(idOrCode: string): Promise<any> {
    const prisma = PrismaConnection.getInstance();
    const id = parseInt(idOrCode);
    const where = id ? { id: id } : { code: idOrCode };
    const rs = await prisma.car.findMany({
      select: carSchema,
      where: where,
    });
    return (rs as any).length > 0 ? rs[0] : null;
  }

  /**
   * @method findAll
   * @description Find all Cars
   * @memberof CarService
   * @returns {Promise<any>} - A Promise that resolves to a Response.
   * @async
   */
  public async findAll(): Promise<any> {
    const prisma = PrismaConnection.getInstance();
    return await prisma.car.findMany({
      select: carSchema,
    });
  }

  /**
   * @method update
   * @description Update a Car
   * @memberof CarService
   * @param {number} id - The id.
   * @returns {Promise<any>} - A Promise that resolves to a Response.
   * @async
   */
  public async update(id: number, req: any): Promise<any> {
    const prisma = PrismaConnection.getInstance();
    return await prisma.car.update({
      where: {
        id: id,
      },
      data: {
        code: req.code,
        model: {
          connect: {
            id: req.model,
          },
        },
        finish: {
          connect: {
            id: req.finish,
          },
        },
        battery: {
          connect: {
            id: req.battery,
          },
        },
      },
      select: carSchema,
    });
  }

  /**
   * @method delete
   * @description Delete a Car
   * @memberof CarService
   * @param {number} id - The id.
   * @returns {Promise<any>} - A Promise that resolves to a Response.
   * @async
   */
  public async delete(id: number): Promise<any> {
    const prisma = PrismaConnection.getInstance();
    return await prisma.car.delete({
      where: {
        id: id,
      },
    });
  }

  /**
   * @method configure
   * @description Configure a Car
   * @memberof CarService
   * @param {Request} req - The Request.
   * @returns {Promise<Response | CarConfigure>} - A Promise that resolves to a Response or CarConfigure.
   * @async
   */
  public async configure(req: any): Promise<Response | CarConfiguredResponse> {
    const prisma = PrismaConnection.getInstance();

    if (!req.model) {
      return { code: 400, message: "Model is required" };
    }
    const where = {
      id: parseInt(req.model, 10),
    };

    // find the model
    const findCar: any = await prisma.model.findFirst({
      where: where,
      select: carConfigureSchema,
    });

    if (!findCar) {
      return { code: 400, message: "Car not found" };
    }

    // initialize the base price and necessary selections
    let price = findCar.price;
    const finishes: FinishConfigure[] = [];
    const colors: ColorConfigure[] = [];
    const batteries: BatteryConfigure[] = [];
    let finishSelected = null;
    let colorSelected = null;
    let batterySelected = null;
    let carSelected = null;

    // iterate over the finishes
    for (const index in findCar.finishes) {
      const finish: any = findCar.finishes[index];
      const element: FinishConfigure = {
        id: finish.id,
        description: finish.description,
        price: finish.price,
        name: finish.name,
        state: {
          selected: false,
          unavailable: false,
        },
      };
      // if the finish is selected or the first one
      if (finish.id == req.finish || (!req.finish && index == "0")) {
        element.state.selected = true;
        finishSelected = finish;
        price += finish.price;
      }
      finishes.push(element);
    }

    if (null === finishSelected) {
      return { code: 400, message: "Car not found" };
    }

    // iterate over the colors
    for (const index in finishSelected.colors) {
      const color: any = finishSelected.colors[index];
      const element: ColorConfigure = {
        id: color.id,
        code: color.code,
        hexa: color.hexa,
        name: color.name,
        description: color.description,
        price: color.price,
        state: {
          selected: false,
          unavailable: false,
        },
      };
      // if the color is selected or the first one
      if (color.id == req.color || (!req.color && index == "0")) {
        element.state.selected = true;
        price += color.price;
        colorSelected = color;
      }
      colors.push(element);
    }

    // iterate over the batteries
    for (const index in finishSelected.batteries) {
      const battery: any = finishSelected.batteries[index];
      const element: BatteryConfigure = {
        id: battery.id,
        description: battery.description,
        name: battery.name,
        power: battery.power,
        capacity: battery.capacity,
        price: battery.price,
        state: {
          selected: false,
          unavailable: false,
        },
      };
      // if the battery is selected or the first one
      if (battery.id == req.battery || (!req.battery && index == "0")) {
        element.state.selected = true;
        price += battery.price;
        batterySelected = battery;
      }
      batteries.push(element);
    }

    // check if the car is compatible with the selected finish and battery
    for (const index in findCar.cars) {
      const car: any = findCar.cars[index];
      if (
        car.finish.id == finishSelected.id &&
        car.battery.id == batterySelected.id
      ) {
        carSelected = car;
        break;
      }
    }

    if (!carSelected) {
      return { code: 400, message: "Car combination not found" };
    }

    // create the UIC (Unique Identification Code with the car combination and color code)
    const uic = carSelected.code + "-" + colorSelected.code;
    const carConfigured: CarConfigured = {
      price: this.priceFormatter(price),
      uic: uic,
      model: {
        id: findCar.id,
        name: findCar.name,
        description: findCar.description,
        type: findCar.type,
        price: this.priceFormatter(price),
      },
      finishes: finishes,
      image: `${process.env.CAR_SERVICE_IMAGE_URL}/images/configure/${carSelected.code}/${colorSelected.code}.png`,
      colors: colors,
      batteries: batteries,
    };

    return {
      code: 200,
      value: carConfigured,
    };
  }

  /**
   * @method checkCompatibility
   * @description Check the compatibility of a car
   * @memberof CarService
   * @param {Request} req - The Request.
   * @param {number} withColorID - The color id.
   * @returns {Promise<Response>} - A Promise that resolves to a Response.
   * @async
   */
  public async checkCompatibility(
    req: any,
    withColorID?: number
  ): Promise<Response> {
    const prisma = PrismaConnection.getInstance();
    const finish = req.finish;
    const model = req.model;
    const battery = req.battery;

    const checkModelWithFinishes = await prisma.model.findUnique({
      where: {
        id: model,
        finishes: {
          some: {
            id: finish,
          },
        },
      },
      select: {
        name: true,
      },
    });
    if (!checkModelWithFinishes) {
      return { code: 400, message: "Model not compatible with finish" };
    }

    const checkFinishWithBattery = await prisma.finish.findUnique({
      where: {
        id: finish,
        batteries: {
          some: {
            id: battery,
          },
        },
      },
      select: {
        name: true,
      },
    });
    if (!checkFinishWithBattery) {
      return { code: 400, message: "Finish not compatible with battery" };
    }

    if (withColorID) {
      const checkFinishWithColor = await prisma.finish.findUnique({
        where: {
          id: finish,
          colors: {
            some: {
              id: withColorID,
            },
          },
        },
        select: {
          name: true,
        },
      });
      if (!checkFinishWithColor) {
        return { code: 400, message: "Finish not compatible with color" };
      }
    }

    return { code: 200, message: "Car is compatible" };
  }
}
