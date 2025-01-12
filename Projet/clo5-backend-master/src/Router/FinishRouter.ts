import { FinishController } from "../Controller/FinishController";
import { AuthService } from "../Service/AuthService";
import { BaseRouter } from "./BaseRouter";
import { RouterInterface } from "./RouterInterface";

/**
 * FinishRouter
 * defines the routes for the finish
 * @extends BaseRouter
 * @implements RouterInterface
 * @method run
 * @property controller
 * @property router
 * @returns {void}
 */
export class FinishRouter extends BaseRouter implements RouterInterface {
  controller: FinishController = new FinishController();
  run(): void {
    // Create a finish
    this.router.post(
      "/finish",
      AuthService.login,
      this.controller.create.bind(this.controller)
    );
    // Get all finishes
    this.router.get("/finishes", this.controller.list.bind(this.controller));
    // Get one finish with id
    this.router.get("/finish/:id", (req, res) => {
      const id = parseInt(req.params.id, 10);
      if (!id) {
        return res.status(400).json({ message: "Id must be a number" });
      }
      return this.controller.read(id, res);
    });
    // Update one finish with id
    this.router.put("/finish/:id", AuthService.login, (req, res) => {
      const id = parseInt(req.params.id, 10);
      if (!id) {
        return res.status(400).json({ message: "Id must be a number" });
      }
      return this.controller.update(id, req, res);
    });
    // Delete one finish with id
    this.router.delete("/finish/:id", AuthService.login, (req, res) => {
      const id = parseInt(req.params.id, 10);
      if (!id) {
        return res.status(400).json({ message: "Id must be a number" });
      }
      return this.controller.delete(id, res);
    });
  }
}
