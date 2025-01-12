import { Router } from "express";
import { RouterInterface } from "./RouterInterface";

/**
 * BaseRouter
 * Base class for all routers
 */
export class BaseRouter implements RouterInterface {
  protected router: Router;

  controller: any;
  static instance: BaseRouter | null = null;

  constructor() {
    this.router = Router();
  }
  static init(): Router {
    if (this.instance === null || !this.instance) {
      this.instance = new this();
      this.instance.run();
    }
    return this.instance.router;
  }
  run(): void {
    throw new Error("Method not implemented.");
  }
}
