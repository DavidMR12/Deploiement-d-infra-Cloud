import { PrismaClient } from "@prisma/client";
import { BatteryService } from "../src/Service/BatteryService";

const prisma = new PrismaClient();

describe("BatteryService", () => {
  let batteryService: BatteryService;

  beforeAll(() => {
    batteryService = new BatteryService();
  });

  it("should validate a battery", async () => {
    const req = {
      name: "Battery1",
      description: "This is a battery",
      capacity: 1000,
      power: 1000,
      price: 1000,
      finishes: [1, 2, 3],
    };
    const result = await batteryService.validate(req);
    expect(result.sucess).toBe(true);
  });

  it("should create a battery", async () => {
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
      name: "Battery1",
      description: "This is a battery",
      price: 1000,
      power: 1000,
      capacity: 1000,
      finishes: [finish1.id, finish2.id],
    };
    const result = await batteryService.create(req);
    expect(result.name).toEqual(req.name);
    expect(result.finishes.length).toEqual(2);
    expect(result.finishes[0].id).toEqual(finish1.id);
    expect(result.finishes[1].id).toEqual(finish2.id);
  });

  it("should create a battery with non-existing finishes", async () => {
    const req = {
      name: "Battery1",
      description: "This is a battery",
      price: 1000,
      capacity: 123,
      power: 123,
      finishes: [999, 991],
    };
    await expect(batteryService.create(req)).rejects.toThrow();
  });

  it("should find a battery by id", async () => {
    const battery = await prisma.battery.findFirst();
    expect(battery).not.toBeNull();
    if (!battery) return;
    const result = await batteryService.findOne(battery.id);
    expect(result.id).toEqual(battery?.id);
  });

  it("should find all batteries", async () => {
    const result = await batteryService.findAll();
    expect(result).toBeInstanceOf(Array);
  });

  it("should update a battery", async () => {
    const finish1 = await prisma.finish.create({
      data: {
        name: "Finish 3",
        description: "This is a finish",
        price: 1000,
      },
    });
    expect(finish1).not.toBeNull();

    const battery = await prisma.battery.findFirst();
    const req = {
      name: "UpdatedBattery",
      description: "This is an updated battery",
      price: 1500,
      capacity: 1500,
      power: 1500,
      finishes: [finish1.id],
    };
    expect(battery).not.toBeNull();
    if (!battery) return;
    const result = await batteryService.update(battery.id, req);
    expect(result.name).toEqual(req.name);
  });

  it("should delete a battery", async () => {
    const finish1 = await prisma.finish.create({
      data: {
        name: "Finish 3",
        description: "This is a finish",
        price: 1000,
      },
    });
    expect(finish1).not.toBeNull();
    const battery = await prisma.battery.create({
      data: {
        name: "BatteryToDelete",
        description: "This is a battery to delete",
        price: 1000,
        capacity: 1000,
        power: 1000,
        finishes: {
          connect: [{ id: finish1.id }],
        },
      },
    });
    await batteryService.delete(battery.id);
    const result = await prisma.battery.findUnique({
      where: { id: battery.id },
    });
    expect(result).toBeNull();
  });
});
