import { PrismaClient } from "@prisma/client";
import { ColorService } from "../src/Service/ColorService";

const prisma = new PrismaClient();

describe("ColorService", () => {
  let colorService: ColorService;

  beforeAll(() => {
    colorService = new ColorService();
  });

  it("should validate a color", async () => {
    const req = {
      name: "Color1",
      description: "This is a color",
      code: "123",
      price: 1000,
      hexa: "000000",
      finishes: [1, 2, 3],
    };
    const result = await colorService.validate(req);
    expect(result.sucess).toBe(true);
  });

  it("should create a color", async () => {
    const finish1 = await prisma.finish.create({
      data: {
        name: "Finish1",
        description: "This is a finish",
        price: 1000,
      },
    });
    expect(finish1).not.toBeNull();

    const finish2 = await prisma.finish.create({
      data: {
        name: "Finish2",
        description: "This is a finish",
        price: 1000,
      },
    });

    expect(finish2).not.toBeNull();

    const req = {
      name: "Color1",
      description: "This is a color",
      price: 1000,
      code: "555",
      hexa: "000000",
      finishes: [finish1.id, finish2.id],
    };
    const result = await colorService.create(req);
    expect(result.name).toEqual(req.name);
    expect(result.finishes.length).toEqual(2);
    expect(result.finishes[0].id).toEqual(finish1.id);
    expect(result.finishes[1].id).toEqual(finish2.id);
  });

  it("should create a color with non-existing finish", async () => {
    const req = {
      name: "Color1",
      description: "This is a color",
      code: "456",
      power: 123,
      hexa: "000000",
      finishes: [999, 991],
    };
    await expect(colorService.create(req)).rejects.toThrow();
  });

  it("should find a color by id", async () => {
    const color = await prisma.color.findFirst();
    expect(color).not.toBeNull();
    if (!color) return;
    const result = await colorService.findOne(color.id);
    expect(result.id).toEqual(color?.id);
  });

  it("should find a color by code", async () => {
    const req = {
      name: "Color1",
      description: "This is a color",
      price: 1000,
      code: "891",
      hexa: "000000",
      finishes: [],
    };
    const result = await colorService.create(req);
    expect(result).not.toBeNull();
    if (!result) return;
    const result2 = await colorService.findOne(result.id);
    expect(result.code).toEqual(result2?.code);
  });

  it("should find all colors", async () => {
    const result = await colorService.findAll();
    expect(result).toBeInstanceOf(Array);
  });

  it("should update a color", async () => {
    const finish1 = await prisma.finish.create({
      data: {
        name: "Finish 3",
        description: "This is a finish",
        price: 1000,
      },
    });
    expect(finish1).not.toBeNull();

    const color = await prisma.color.findFirst();
    const req = {
      name: "UpdatedColor",
      description: "This is an updated color",
      price: 1500,
      code: "257",
      hexa: "000000",
      finishes: [finish1.id],
    };
    expect(color).not.toBeNull();
    if (!color) return;
    const result = await colorService.update(color.id, req);
    expect(result.name).toEqual(req.name);
  });

  it("should delete a color", async () => {
    const finish1 = await prisma.finish.create({
      data: {
        name: "Finish 3",
        description: "This is a finish",
        price: 1000,
      },
    });
    expect(finish1).not.toBeNull();
    const color = await prisma.color.create({
      data: {
        name: "ColorToDelete",
        description: "This is a color to delete",
        price: 1000,
        code: "268",
        hexa: "000000",
        finishes: {
          connect: [{ id: finish1.id }],
        },
      },
    });
    await colorService.delete(color.id);
    const result = await prisma.color.findUnique({
      where: { id: color.id },
    });
    expect(result).toBeNull();
  });
});
