import { Finish } from "../Entity/Finish";
import { FinishService } from "../Service/FinishService";
import { ValidatorResponse } from "../Type/All";

/**
 * @class FinishController
 * @description Controller for Finish
 * @exports FinishController
 */
export class FinishController {
  /**
   * @private
   * @type {FinishService}
   * @memberof FinishController
   */
  private service: FinishService;

  /**
   * @constructor
   * @description Creates an instance of FinishController.
   * @memberof FinishController
   */
  public constructor() {
    this.service = new FinishService();
  }

  /**
   * @method create
   * @description Create a new Finish
   * @memberof FinishController
   * @param {Request} req - The Request.
   * @param {Response} res - The Response
   * @returns {Promise<Response>} - A Promise that resolves to a Response.
   * @async
   */
  public async create(req: any, res: any): Promise<Finish> {
    const validate: ValidatorResponse = await this.service.validate(req.body);
    if (!validate.sucess) {
      return res.status(400).json(validate);
    }

    const check: boolean = await this.service.checkIfModelExists(
      req.body.models
    );
    if (!check) {
      return res.status(404).json({ message: "Some model not found" });
    }
    const rs = await this.service.create(req.body);
    return rs
      ? res.status(201).json(rs)
      : res.status(400).json({ message: "Error on create a finish" });
  }

  /**
   * @method list
   * @description List all Finishs
   * @memberof FinishController
   * @param {Request} req - The Request.
   * @param {Response} res - The Response
   * @returns {Promise<Response>} - A Promise that resolves to a Response.
   * @async
   */
  public async list(_: any, res: any): Promise<Finish[]> {
    const rs = await this.service.findAll();
    return res.status(200).json(rs);
  }

  /**
   * @method update
   * @description Update a Finish
   * @memberof FinishController
   * @param {number} id - The id.
   * @param {Request} req - The Request.
   * @param {Response} res - The Response
   * @returns {Promise<Response>} - A Promise that resolves to a Response.
   * @async
   */
  public async update(id: number, req: any, res: any): Promise<Finish> {
    let rs = await this.service.findOne(id);
    if (!rs) {
      return res.status(404).json({ message: "Finish not found" });
    }
    const validate: ValidatorResponse = await this.service.validate(req.body);
    if (!validate.sucess) {
      return res.status(400).json(validate);
    }
    const check: boolean = await this.service.checkIfModelExists(
      req.body.models
    );
    if (!check) {
      return res.status(404).json({ message: "Some model not found" });
    }

    rs = await this.service.update(id, req.body);
    return rs
      ? res.status(200).json(rs)
      : res.status(500).json({ message: `Cannot update finish with id ${id}` });
  }

  /**
   * @method read
   * @description Read a Finish
   * @memberof FinishController
   * @param {number} id - The id.
   * @param {Response} res - The Response
   * @returns {Promise<Response>} - A Promise that resolves to a Response.
   * @async
   */
  public async read(id: number, res: any): Promise<Finish> {
    const rs = await this.service.findOne(id);
    return rs
      ? res.status(200).json(rs)
      : res.status(404).json({ message: "Finish not found" });
  }

  /**
   * @method delete
   * @description Delete a Finish
   * @memberof FinishController
   * @param {number} id - The id.
   * @param {Response} res - The Response
   * @returns {Promise<Response>} - A Promise that resolves to a Response.
   * @async
   */
  public async delete(id: number, res: any): Promise<Response> {
    const rs = await this.service.findOne(id);
    if (!rs) {
      return res.status(404).json({ code: 404, message: "Finish not found" });
    }
    const rsDelete = await this.service.delete(id);
    return rsDelete
      ? res.status(200).json({ code: 200, message: "Finish deleted" })
      : res.status(500).json({ message: `Cannot delete finish with id ${id}` });
  }
}
