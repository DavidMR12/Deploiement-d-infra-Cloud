import { CarController } from "../Controller/CarController";
import { AuthService } from "../Service/AuthService";
import { BaseRouter } from "./BaseRouter";
import { RouterInterface } from "./RouterInterface";

export class CarRouter extends BaseRouter implements RouterInterface {
  controller: CarController = new CarController();
  run(): void {
    // Create a car combination
    this.router.post(
      "/car",
      AuthService.login,
      this.controller.create.bind(this.controller)
    );
    // Get all cars
    this.router.get("/cars", this.controller.list.bind(this.controller));
    // Get one car with id
    this.router.get("/car/:idOrCode", (req, res) => {
      const idOrCode = req.params.idOrCode;
      return this.controller.read(idOrCode, res);
    });
    // Update one car with id
    this.router.put("/car/:id", AuthService.login, (req, res) => {
      const id = parseInt(req.params.id, 10);
      if (!id) {
        return res.status(400).json({ message: "Id must be a number" });
      }
      return this.controller.update(id, req, res);
    });
    // Delete one car with id
    this.router.delete("/car/:id", AuthService.login, (req, res) => {
      const id = parseInt(req.params.id, 10);
      if (!id) {
        return res.status(400).json({ message: "Id must be a number" });
      }
      return this.controller.delete(id, res);
    });

    // Configure a car
    this.router.post("/car/configure", (req, res) => {
      return this.controller.configure(req, res);
    });
  }
}
