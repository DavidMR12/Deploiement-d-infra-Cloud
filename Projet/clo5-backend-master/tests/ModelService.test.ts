import { PrismaClient } from "@prisma/client";
import { ModelService } from "../src/Service/ModelService";

const prisma = new PrismaClient();

describe("ModelService", () => {
  let modelService: ModelService;

  beforeAll(() => {
    modelService = new ModelService();
  });

  it("should validate a model", async () => {
    const req = {
      name: "Model1",
      description: "This is a model",
      price: 1000,
      type: "sedan",
    };
    const result = await modelService.validate(req);
    expect(result.sucess).toBe(true);
  });

  it("should create a model", async () => {
    const req = {
      name: "Model1",
      description: "This is a model",
      price: 1000,
      type: "sedan",
    };
    const result = await modelService.create(req);
    expect(result.name).toEqual(req.name);
  });

  it("should find a model by id", async () => {
    const model = await prisma.model.findFirst();
    expect(model).not.toBeNull();
    if (!model) return;
    const result = await modelService.findOne(model.id);
    expect(result.id).toEqual(model?.id);
  });

  it("should find all models", async () => {
    const result = await modelService.findAll();
    expect(result).toBeInstanceOf(Array);
  });

  it("should update a model", async () => {
    const model = await prisma.model.findFirst();
    const req = {
      name: "UpdatedModel",
      description: "This is an updated model",
      price: 1500,
      type: "suv",
    };
    expect(model).not.toBeNull();
    if (!model) return;
    const result = await modelService.update(model.id, req);
    expect(result.name).toEqual(req.name);
  });

  it("should delete a model", async () => {
    const model = await prisma.model.create({
      data: {
        name: "ModelToDelete",
        description: "This is a model to delete",
        price: 1000,
        type: "SEDAN",
      },
    });
    await modelService.delete(model.id);
    const result = await prisma.model.findUnique({ where: { id: model.id } });
    expect(result).toBeNull();
  });
});
