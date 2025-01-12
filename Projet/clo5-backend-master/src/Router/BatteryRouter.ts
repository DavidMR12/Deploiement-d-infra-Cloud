import { BatteryController } from "../Controller/BatteryController";
import { AuthService } from "../Service/AuthService";
import { BaseRouter } from "./BaseRouter";
import { RouterInterface } from "./RouterInterface";

export class BatteryRouter extends BaseRouter implements RouterInterface {
  controller: BatteryController = new BatteryController();
  run(): void {
    // Create a battery
    this.router.post(
      "/battery",
      AuthService.login,
      this.controller.create.bind(this.controller)
    );
    // Get all batteries
    this.router.get("/batteries", this.controller.list.bind(this.controller));
    // Get one battery with id
    this.router.get("/battery/:id", (req, res) => {
      const id = parseInt(req.params.id, 10);
      if (!id) {
        return res.status(400).json({ message: "Id must be a number" });
      }
      return this.controller.read(id, res);
    });
    // Update one battery with id
    this.router.put("/battery/:id", AuthService.login, (req, res) => {
      const id = parseInt(req.params.id, 10);
      if (!id) {
        return res.status(400).json({ message: "Id must be a number" });
      }
      return this.controller.update(id, req, res);
    });
    // Delete one battery with id
    this.router.delete("/battery/:id", AuthService.login, (req, res) => {
      const id = parseInt(req.params.id, 10);
      if (!id) {
        return res.status(400).json({ message: "Id must be a number" });
      }
      return this.controller.delete(id, res);
    });
  }
}
