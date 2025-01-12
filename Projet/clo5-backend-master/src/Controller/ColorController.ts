import { Color } from "../Entity/Color";
import { ColorService } from "../Service/ColorService";
import { ValidatorResponse } from "../Type/All";

/**
 * @class ColorController
 * @description Controller for Color
 * @exports ColorController
 */
export class ColorController {
  /**
   * @private
   * @type {ColorService}
   * @memberof ColorController
   */
  private service: ColorService;

  /**
   * @constructor
   * @description Creates an instance of ColorController.
   * @memberof ColorController
   */
  public constructor() {
    this.service = new ColorService();
  }

  /**
   * @method create
   * @description Create a new Color
   * @memberof ColorController
   * @param {Request} req - The Request.
   * @param {Response} res - The Response
   * @returns {Promise<Response>} - A Promise that resolves to a Response.
   * @async
   */
  public async create(req: any, res: any): Promise<Color> {
    const validate: ValidatorResponse = await this.service.validate(req.body);
    if (!validate.sucess) {
      return res.status(400).json(validate);
    }

    let check: boolean = await this.service.checkIfFinishExists(
      req.body.finishes
    );
    if (!check) {
      return res.status(404).json({ message: "Some finish not found" });
    }

    check = await this.service.checkIfColorCodeExists(req.body.code);
    if (check) {
      return res.status(400).json({ message: "Color code already exists" });
    }

    const rs = await this.service.create(req.body);
    return rs
      ? res.status(201).json(rs)
      : res.status(400).json({ message: "Error on create a battery" });
  }

  /**
   * @method list
   * @description List all Colors
   * @memberof ColorController
   * @param {Request} req - The Request.
   * @param {Response} res - The Response
   * @returns {Promise<Response>} - A Promise that resolves to a Response.
   * @async
   */
  public async list(_: any, res: any): Promise<Color[]> {
    const rs = await this.service.findAll();
    return res.status(200).json(rs);
  }

  /**
   * @method update
   * @description Update a Color
   * @memberof ColorController
   * @param {number} id - The id.
   * @param {Request} req - The Request.
   * @param {Response} res - The Response
   * @returns {Promise<Response>} - A Promise that resolves to a Response.
   * @async
   */
  public async update(id: number, req: any, res: any): Promise<Color> {
    let rs = await this.service.findOne(id);
    if (!rs) {
      return res.status(404).json({ message: "Color not found" });
    }
    const validate: ValidatorResponse = await this.service.validate(req.body);
    if (!validate.sucess) {
      return res.status(400).json(validate);
    }
    let check: boolean = await this.service.checkIfColorCodeExists(
      req.body.code,
      id
    );
    if (check) {
      return res.status(400).json({ message: "Color code already exists" });
    }

    check = await this.service.checkIfFinishExists(req.body.finishes);
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
   * @description Read a Color
   * @memberof ColorController
   * @param {number} id - The id.
   * @param {Response} res - The Response
   * @returns {Promise<Response>} - A Promise that resolves to a Response.
   * @async
   */
  public async read(id: number, res: any): Promise<Color> {
    const rs = await this.service.findOne(id);
    return rs
      ? res.status(200).json(rs)
      : res.status(404).json({ message: "Color not found" });
  }

  /**
   * @method delete
   * @description Delete a Color
   * @memberof ColorController
   * @param {number} id - The id.
   * @param {Response} res - The Response
   * @returns {Promise<Response>} - A Promise that resolves to a Response.
   * @async
   */
  public async delete(id: number, res: any): Promise<Response> {
    const rs = await this.service.findOne(id);
    if (!rs) {
      return res.status(404).json({ code: 404, message: "Color not found" });
    }
    const rsDelete = await this.service.delete(id);
    return rsDelete
      ? res.status(200).json({ code: 200, message: "Color deleted" })
      : res
          .status(500)
          .json({ message: `Cannot delete battery with id ${id}` });
  }
}
