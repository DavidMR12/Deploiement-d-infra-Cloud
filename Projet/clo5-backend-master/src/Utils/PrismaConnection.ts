import { Prisma, PrismaClient } from "@prisma/client";

export class PrismaConnection {
  public static instance: PrismaClient<Prisma.PrismaClientOptions, "query">;

  static getInstance(): PrismaClient<Prisma.PrismaClientOptions, "query"> {
    if (this.instance === null || !this.instance) {
      this.instance = new PrismaClient();
    }
    return this.instance;
  }
}
