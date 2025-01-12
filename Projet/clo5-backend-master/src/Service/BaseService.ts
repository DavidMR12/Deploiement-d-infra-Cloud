import { PrismaConnection } from "../Utils/PrismaConnection";

/**
 * @class BaseService
 * @description Base Service class that contains common methods for all services
 */
export class BaseService {
  /**
   * @method checkIfFinishExists
   * @description Check if a list of finishes exists
   * @memberof BaseService
   * @param {number[]} finishes - The list of finishes
   * @returns {Promise<boolean>} - A Promise that resolves to a boolean
   * @async
   */
  public async checkIfFinishExists(finishes: number[]): Promise<boolean> {
    const prisma = PrismaConnection.getInstance();
    const list = await prisma.finish.findMany({
      where: {
        id: {
          in: finishes,
        },
      },
    });
    return list.length === finishes.length;
  }

  /**
   * @method checkIfModelExists
   * @description Check if a list of models exists
   * @memberof BaseService
   * @param {number[]} models - The list of models
   * @returns {Promise<boolean>} - A Promise that resolves to a boolean
   * @async
   */
  public async checkIfModelExists(models: number[]): Promise<boolean> {
    const prisma = PrismaConnection.getInstance();
    const list = await prisma.model.findMany({
      where: {
        id: {
          in: models,
        },
      },
    });
    return list.length === models.length;
  }

  /**
   * @method checkIfBatteryExists
   * @description Check if a list of batteries exists
   * @memberof BaseService
   * @param {number[]} batteries - The list of batteries
   * @returns {Promise<boolean>} - A Promise that resolves to a boolean
   * @async
   */
  public async checkIfBatteryExists(batteries: number[]): Promise<boolean> {
    const prisma = PrismaConnection.getInstance();
    const list = await prisma.battery.findMany({
      where: {
        id: {
          in: batteries,
        },
      },
    });
    return list.length === batteries.length;
  }

  /**
   * @method checkIfColorCodeExists
   * @description Check if a color code exists
   * @memberof BaseService
   * @param {string} code - The color code
   * @returns {Promise<boolean>} - A Promise that resolves to a boolean
   * @async
   */
  public async checkIfColorCodeExists(
    code: string,
    id?: number
  ): Promise<boolean> {
    const prisma = PrismaConnection.getInstance();
    const where = !id ? { code: code } : { code: code, id: { not: id } };
    const list = await prisma.color.findMany({
      where: where,
    });

    return list.length > 0;
  }

  /**
   * @method checkIfCarExists
   * @description Check if a car exists
   * @memberof BaseService
   * @param {string} code - The car code
   * @param {number} id - The car id
   * @returns {Promise<boolean>} - A Promise that resolves to a boolean
   * @async
   */
  public async checkIfCarExists(code: string, id?: number): Promise<boolean> {
    const prisma = PrismaConnection.getInstance();
    const where = !id
      ? { code: code }
      : {
          code: code,
          NOT: {
            id: id,
          },
        };
    const list = await prisma.car.findMany({
      where: where,
    });
    return list.length > 0;
  }

  public async checkIfCombinationExist(
    finish: number,
    model: number,
    battery: number
  ): Promise<boolean> {
    const prisma = PrismaConnection.getInstance();
    const list = await prisma.car.findMany({
      where: {
        finish: {
          id: finish,
        },
        model: {
          id: model,
        },
        battery: {
          id: battery,
        },
      },
    });
    return list.length > 0;
  }

  /**
   * Format a price to a number with 2 decimal places
   * @param value  The value to be formatted
   * @returns The formatted value
   */
  public priceFormatter(value: number): number {
    if (value % 1 === 0) {
      return value;
    }
    let str = value.toString();
    str = str.slice(0, str.indexOf(".") + 2 + 1);
    return Number(str);
  }
}
