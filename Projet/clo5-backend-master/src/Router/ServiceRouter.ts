import { PrismaConnection } from "../Utils/PrismaConnection";
import { BaseRouter } from "./BaseRouter";
import { RouterInterface } from "./RouterInterface";

/**
 * ServiceRouter
 * Service route for the application
 * @extends BaseRouter
 * @implements RouterInterface
 * @method run
 * @property controller
 * @property router
 * @returns {void}
 */
export class ServiceRouter extends BaseRouter implements RouterInterface {
  controller = null;
  run(): void {
    this.router.get("/health", (req: any, res: any) => {
      // check prisma connection
      return PrismaConnection.getInstance()
        .$connect()
        .then(() => {
          res.send("OK");
        })
        .catch((e) => {
          res.status(500).send("Database KO");
          console.error("Prisma connection failed: " + e.message);
        });
    });
  }
}
