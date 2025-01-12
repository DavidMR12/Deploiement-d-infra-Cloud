import { Battery } from "../Entity/Battery";
import { BatteryService } from "../Service/BatteryService";
import { ValidatorResponse } from "../Type/All";

/**
 * @class BatteryController
 * @description Controller for Battery
 * @exports BatteryController
 */
export class BatteryController {
  /**
   * @private
   * @type {BatteryService}
   * @memberof BatteryController
   */
  private service: BatteryService;

  /**
   * @constructor
   * @description Creates an instance of BatteryController.
   * @memberof BatteryController
   */
  public constructor() {
    this.service = new BatteryService();
  }

  /**
   * @method create
   * @description Create a new Battery
   * @memberof BatteryController
   * @param {Request} req - The Request.
   * @param {Response} res - The Response
   * @returns {Promise<Response>} - A Promise that resolves to a Response.
   * @async
   */
  public async create(req: any, res: any): Promise<Battery> {
    const validate: ValidatorResponse = await this.service.validate(req.body);
    if (!validate.sucess) {
      return res.status(400).json(validate);
    }

    const check: boolean = await this.service.checkIfFinishExists(
      req.body.finishes
    );
    if (!check) {
      return res.status(404).json({ message: "Some finish not found" });
    }
    const rs = await this.service.create(req.body);
    return rs
      ? res.status(201).json(rs)
      : res.status(400).json({ message: "Error on create a battery" });
  }

  /**
   * @method list
   * @description List all Batterys
   * @memberof BatteryController
   * @param {Request} req - The Request.
   * @param {Response} res - The Response
   * @returns {Promise<Response>} - A Promise that resolves to a Response.
   * @async
   */
  public async list(_: any, res: any): Promise<Battery[]> {
    const rs = await this.service.findAll();
    return res.status(200).json(rs);
  }

  /**
   * @method update
   * @description Update a Battery
   * @memberof BatteryController
   * @param {number} id - The id.
   * @param {Request} req - The Request.
   * @param {Response} res - The Response
   * @returns {Promise<Response>} - A Promise that resolves to a Response.
   * @async
   */
  public async update(id: number, req: any, res: any): Promise<Battery> {
    let rs = await this.service.findOne(id);
    if (!rs) {
      return res.status(404).json({ message: "Battery not found" });
    }
    const validate: ValidatorResponse = await this.service.validate(req.body);
    if (!validate.sucess) {
      return res.status(400).json(validate);
    }
    const check: boolean = await this.service.checkIfFinishExists(
      req.body.finishes
    );
    if (!check) {
      return res.status(404).json({ message: "Some finish not found" });
    }

    rs = await this.service.update(id, req.body);
    return rs
      ? res.status(200).json(rs)
      : res
          .status(500)
          .json({ message: `Cannot update battery with id ${id}` });
  }

  /**
   * @method read
   * @description Read a Battery
   * @memberof BatteryController
   * @param {number} id - The id.
   * @param {Response} res - The Response
   * @returns {Promise<Response>} - A Promise that resolves to a Response.
   * @async
   */
  public async read(id: number, res: any): Promise<Battery> {
    const rs = await this.service.findOne(id);
    return rs
      ? res.status(200).json(rs)
      : res.status(404).json({ message: "Battery not found" });
  }

  /**
   * @method delete
   * @description Delete a Battery
   * @memberof BatteryController
   * @param {number} id - The id.
   * @param {Response} res - The Response
   * @returns {Promise<Response>} - A Promise that resolves to a Response.
   * @async
   */
  public async delete(id: number, res: any): Promise<Response> {
    const rs = await this.service.findOne(id);
    if (!rs) {
      return res.status(404).json({ code: 404, message: "Battery not found" });
    }
    const rsDelete = await this.service.delete(id);
    return rsDelete
      ? res.status(200).json({ code: 200, message: "Battery deleted" })
      : res
          .status(500)
          .json({ message: `Cannot delete battery with id ${id}` });
  }
}
