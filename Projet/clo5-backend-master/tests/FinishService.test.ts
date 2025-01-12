import { PrismaClient } from "@prisma/client";
import { FinishService } from "../src/Service/FinishService";

const prisma = new PrismaClient();

describe("FinishService", () => {
  let finishService: FinishService;

  beforeAll(() => {
    finishService = new FinishService();
  });

  it("should validate a finish", async () => {
    const req = {
      name: "Finish1",
      description: "This is a finish",
      price: 1000,
      models: [1, 2, 3],
    };
    const result = await finishService.validate(req);
    expect(result.sucess).toBe(true);
  });

  it("should create a finish", async () => {
    const model1 = await prisma.model.create({
      data: {
        name: "Model1",
        description: "This is a model",
        price: 1000,
        type: "SUV",
      },
    });
    expect(model1).not.toBeNull();

    const model2 = await prisma.model.create({
      data: {
        name: "Model2",
        description: "This is a model",
        price: 1000,
        type: "SEDAN",
      },
    });

    expect(model2).not.toBeNull();

    const req = {
      name: "Finish1",
      description: "This is a finish",
      price: 1000,
      models: [model1.id, model2.id],
    };
    const result = await finishService.create(req);
    expect(result.name).toEqual(req.name);
    expect(result.models.length).toEqual(2);
    expect(result.models[0].id).toEqual(model1.id);
    expect(result.models[1].id).toEqual(model2.id);
  });

  it("should create a finish with non-existing models", async () => {
    const req = {
      name: "Finish1",
      description: "This is a finish",
      price: 1000,
      models: [9999, 9992],
    };
    await expect(finishService.create(req)).rejects.toThrow();
  });

  it("should find a finish by id", async () => {
    const finish = await prisma.finish.findFirst();
    expect(finish).not.toBeNull();
    if (!finish) return;
    const result = await finishService.findOne(finish.id);
    expect(result.id).toEqual(finish?.id);
  });

  it("should find all models", async () => {
    const result = await finishService.findAll();
    expect(result).toBeInstanceOf(Array);
  });

  it("should update a finish", async () => {
    const model1 = await prisma.model.create({
      data: {
        name: "Model4",
        description: "This is a model",
        price: 1000,
        type: "SUV",
      },
    });
    expect(model1).not.toBeNull();

    const finish = await prisma.finish.findFirst();
    const req = {
      name: "UpdatedFinish",
      description: "This is an updated finish",
      price: 1500,
      models: [model1.id],
    };
    expect(finish).not.toBeNull();
    if (!finish) return;
    const result = await finishService.update(finish.id, req);
    expect(result.name).toEqual(req.name);
  });

  it("should delete a finish", async () => {
    const model1 = await prisma.model.create({
      data: {
        name: "Model4",
        description: "This is a model",
        price: 1000,
        type: "SUV",
      },
    });
    expect(model1).not.toBeNull();
    const finish = await prisma.finish.create({
      data: {
        name: "FinishToDelete",
        description: "This is a finish to delete",
        price: 1000,
        models: {
          connect: [{ id: model1.id }],
        },
      },
    });
    await finishService.delete(finish.id);
    const result = await prisma.finish.findUnique({ where: { id: finish.id } });
    expect(result).toBeNull();
  });
});
