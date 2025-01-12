import { Car } from "../Entity/Car";
import { CarService } from "../Service/CarService";
import { Response, ValidatorResponse } from "../Type/All";

/**
 * @class CarController
 * @description Controller for Car
 * @exports CarController
 */
export class CarController {
  /**
   * @private
   * @type {CarService}
   * @memberof CarController
   */
  private service: CarService;

  /**
   * @constructor
   * @description Creates an instance of CarController.
   * @memberof CarController
   */
  public constructor() {
    this.service = new CarService();
  }

  /**
   * @method create
   * @description Create a new Car
   * @memberof CarController
   * @param {Request} req - The Request.
   * @param {Response} res - The Response
   * @returns {Promise<Response>} - A Promise that resolves to a Response.
   * @async
   */
  public async create(req: any, res: any): Promise<Car> {
    const validate: ValidatorResponse = await this.service.validate(req.body);
    if (!validate.sucess) {
      return res.status(400).json(validate);
    }

    let check: boolean = await this.service.checkIfFinishExists([
      req.body.finish,
    ]);
    if (!check) {
      return res.status(404).json({ message: "Finish not found" });
    }
    check = await this.service.checkIfModelExists([req.body.model]);
    if (!check) {
      return res.status(404).json({ message: "Model not found" });
    }
    check = await this.service.checkIfBatteryExists([req.body.battery]);
    if (!check) {
      return res.status(404).json({ message: "Battery not found" });
    }

    const checkCompatibility: Response = await this.service.checkCompatibility(
      req.body
    );
    if (checkCompatibility["code"] !== 200) {
      return res.status(400).json(checkCompatibility);
    }

    check = await this.service.checkIfCarExists(req.body.code);
    if (check) {
      return res.status(400).json({
        message: "Car code already exists",
      });
    }

    check = await this.service.checkIfCombinationExist(
      req.body.finish,
      req.body.model,
      req.body.battery
    );
    if (check) {
      return res.status(400).json({
        message: "Car combination already exist",
      });
    }

    const rs = await this.service.create(req.body);
    return rs
      ? res.status(201).json(rs)
      : res.status(400).json({ message: "Error on create a car" });
  }

  /**
   * @method list
   * @description List all Cars
   * @memberof CarController
   * @param {Request} req - The Request.
   * @param {Response} res - The Response
   * @returns {Promise<Response>} - A Promise that resolves to a Response.
   * @async
   */
  public async list(_: any, res: any): Promise<Car[]> {
    const rs = await this.service.findAll();
    return res.status(200).json(rs);
  }

  /**
   * @method update
   * @description Update a Car
   * @memberof CarController
   * @param {number} id - The id.
   * @param {Request} req - The Request.
   * @param {Response} res - The Response
   * @returns {Promise<Response>} - A Promise that resolves to a Response.
   * @async
   */
  public async update(id: number, req: any, res: any): Promise<Car> {
    let rs = await this.service.findOne(id.toString());
    if (!rs) {
      return res.status(404).json({ message: "Car not found" });
    }
    const validate: ValidatorResponse = await this.service.validate(req.body);
    if (!validate.sucess) {
      return res.status(400).json(validate);
    }

    let check: boolean = await this.service.checkIfFinishExists([
      req.body.finish,
    ]);
    if (!check) {
      return res.status(404).json({ message: "Finish not found" });
    }
    check = await this.service.checkIfModelExists([req.body.model]);
    if (!check) {
      return res.status(404).json({ message: "Model not found" });
    }
    check = await this.service.checkIfBatteryExists([req.body.battery]);
    if (!check) {
      return res.status(404).json({ message: "Battery not found" });
    }

    check = await this.service.checkIfCarExists(req.body.code, id);
    if (check) {
      return res.status(400).json({ message: "Car code already exists" });
    }

    const checkCompatibility: Response = await this.service.checkCompatibility(
      req.body
    );
    if (checkCompatibility["code"] !== 200) {
      return res.status(400).json(checkCompatibility);
    }

    rs = await this.service.update(id, req.body);
    return rs
      ? res.status(200).json(rs)
      : res.status(500).json({ message: `Cannot update car with id ${id}` });
  }

  /**
   * @method read
   * @description Read a Car
   * @memberof CarController
   * @param {string} idOrCode - The id or code
   * @param {Response} res - The Response
   * @returns {Promise<Response>} - A Promise that resolves to a Response.
   * @async
   */
  public async read(idOrCode: string, res: any): Promise<Car> {
    const rs = await this.service.findOne(idOrCode);
    return rs
      ? res.status(200).json(rs)
      : res.status(404).json({ message: "Car not found" });
  }

  /**
   * @method delete
   * @description Delete a Car
   * @memberof CarController
   * @param {number} id - The id.
   * @param {Response} res - The Response
   * @returns {Promise<Response>} - A Promise that resolves to a Response.
   * @async
   */
  public async delete(id: number, res: any): Promise<Response> {
    const rs = await this.service.findOne(id.toString());
    if (!rs) {
      return res.status(404).json({ code: 404, message: "Car not found" });
    }
    const rsDelete = await this.service.delete(id);
    return rsDelete
      ? res.status(200).json({ code: 200, message: "Car deleted" })
      : res.status(500).json({ message: `Cannot delete car with id ${id}` });
  }

  /**
   * @method configure
   * @description Configure a Car
   * @memberof CarController
   * @param {Request} req - The Request.
   * @param {Response} res - The Response
   * @returns {Promise<Response>} - A Promise that resolves to a Response.
   * @async
   */
  public async configure(req: any, res: any): Promise<Response> {
    const validate: ValidatorResponse = await this.service.validateConfigure(
      req.body
    );
    if (!validate.sucess) {
      return res.status(400).json(validate);
    }
    const rs = await this.service.configure(req.body);
    return rs
      ? res.status(200).json(rs)
      : res.status(400).json({ message: "Error to configure a car" });
  }
}
