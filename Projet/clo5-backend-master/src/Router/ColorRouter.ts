import { ColorController } from "../Controller/ColorController";
import { AuthService } from "../Service/AuthService";
import { BaseRouter } from "./BaseRouter";
import { RouterInterface } from "./RouterInterface";

export class ColorRouter extends BaseRouter implements RouterInterface {
  controller: ColorController = new ColorController();
  run(): void {
    // Create a color
    this.router.post(
      "/color",
      AuthService.login,
      this.controller.create.bind(this.controller)
    );
    // Get all colors
    this.router.get("/colors", this.controller.list.bind(this.controller));
    // Get one color with id
    this.router.get("/color/:id", (req, res) => {
      const id = parseInt(req.params.id, 10);
      if (!id) {
        return res.status(400).json({ message: "Id must be a number" });
      }
      return this.controller.read(id, res);
    });
    // Update one color with id
    this.router.put("/color/:id", AuthService.login, (req, res) => {
      const id = parseInt(req.params.id, 10);
      if (!id) {
        return res.status(400).json({ message: "Id must be a number" });
      }
      return this.controller.update(id, req, res);
    });
    // Delete one color with id
    this.router.delete("/color/:id", AuthService.login, (req, res) => {
      const id = parseInt(req.params.id, 10);
      if (!id) {
        return res.status(400).json({ message: "Id must be a number" });
      }
      return this.controller.delete(id, res);
    });
  }
}
