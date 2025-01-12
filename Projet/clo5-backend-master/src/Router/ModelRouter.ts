import { ModelController } from "../Controller/ModelControllers";
import { AuthService } from "../Service/AuthService";
import { BaseRouter } from "./BaseRouter";
import { RouterInterface } from "./RouterInterface";

/**
 * ModelRouter
 * defines the routes for the model
 * @extends BaseRouter
 * @implements RouterInterface
 * @method run
 * @property controller
 * @property router
 * @returns {void}
 */
export class ModelRouter extends BaseRouter implements RouterInterface {
  controller: ModelController = new ModelController();
  run(): void {
    // Create a model
    this.router.post(
      "/model",
      AuthService.login,
      this.controller.create.bind(this.controller)
    );
    // Get all models
    this.router.get("/models", this.controller.list.bind(this.controller));
    // Get one model with id
    this.router.get("/model/:id", (req: any, res: any) => {
      const id = parseInt(req.params.id, 10);
      if (!id) {
        return res.status(400).json({ message: "Id must be a number" });
      }
      return this.controller.read(id, res);
    });
    // Update one model with id
    this.router.put("/model/:id", AuthService.login, (req: any, res: any) => {
      const id = parseInt(req.params.id, 10);
      if (!id) {
        return res.status(400).json({ message: "Id must be a number" });
      }
      return this.controller.update(id, req, res);
    });
    // Delete one model with id
    this.router.delete(
      "/model/:id",
      AuthService.login,
      (req: any, res: any) => {
        const id = parseInt(req.params.id, 10);
        if (!id) {
          return res.status(400).json({ message: "Id must be a number" });
        }
        return this.controller.delete(id, res);
      }
    );
  }
}
