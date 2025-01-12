import { PrismaClient } from "@prisma/client";
import { CarConfiguredResponse } from "../src/Entity/Car";
import { CarService } from "../src/Service/CarService";
import { Response } from "../src/Type/All";

const prisma = new PrismaClient();

describe("CarService", () => {
  let carService: CarService;

  beforeAll(() => {
    carService = new CarService();
  });

  it("should validate a car", async () => {
    const req = {
      code: "PAC",
      finish: 1,
      model: 1,
      battery: 1,
    };
    const result = await carService.validate(req);
    expect(result.sucess).toBe(true);
  });

  it("should create a car", async () => {
    const finish = await prisma.finish.create({
      data: {
        name: "Finish1",
        description: "This is a finish",
        price: 1000,
      },
    });
    expect(finish).not.toBeNull();

    const model = await prisma.model.create({
      data: {
        name: "Model1",
        description: "This is a model",
        price: 1000,
        type: "SUV",
      },
    });

    expect(model).not.toBeNull();

    const battery = await prisma.battery.create({
      data: {
        name: "Battery1",
        description: "This is a battery",
        capacity: 1000,
        power: 1000,
        price: 1000,
      },
    });

    expect(battery).not.toBeNull();

    const req = {
      code: "MXQ",
      finish: finish.id,
      model: model.id,
      battery: battery.id,
    };
    const result = await carService.create(req);
    expect(result.code).toEqual(req.code);
    expect(result.finish.id).toEqual(finish.id);
    expect(result.model.id).toEqual(model.id);
    expect(result.battery.id).toEqual(battery.id);
  });

  it("should create a car with non-existing finish", async () => {
    const model = await prisma.model.create({
      data: {
        name: "Model1",
        description: "This is a model",
        price: 1000,
        type: "SUV",
      },
    });

    expect(model).not.toBeNull();

    const battery = await prisma.battery.create({
      data: {
        name: "Battery1",
        description: "This is a battery",
        capacity: 1000,
        power: 1000,
        price: 1000,
      },
    });

    expect(battery).not.toBeNull();

    const req = {
      code: "PAC",
      finish: 9488839,
      model: model.id,
      battery: battery.id,
    };
    await expect(carService.create(req)).rejects.toThrow();
  });

  it("should create a car with non-existing model", async () => {
    const finish = await prisma.finish.create({
      data: {
        name: "Finish1",
        description: "This is a finish",
        price: 1000,
      },
    });

    expect(finish).not.toBeNull();

    const battery = await prisma.battery.create({
      data: {
        name: "Battery1",
        description: "This is a battery",
        capacity: 1000,
        power: 1000,
        price: 1000,
      },
    });

    expect(battery).not.toBeNull();

    const req = {
      code: "PAC",
      finish: finish.id,
      model: 9488839,
      battery: battery.id,
    };
    await expect(carService.create(req)).rejects.toThrow();
  });

  it("should create a car with non-existing battery", async () => {
    const finish = await prisma.finish.create({
      data: {
        name: "Finish1",
        description: "This is a finish",
        price: 1000,
      },
    });

    expect(finish).not.toBeNull();

    const model = await prisma.model.create({
      data: {
        name: "Model1",
        description: "This is a model",
        price: 1000,
        type: "SUV",
      },
    });

    expect(model).not.toBeNull();

    const req = {
      code: "PAC",
      finish: finish.id,
      model: model.id,
      battery: 9488839,
    };
    await expect(carService.create(req)).rejects.toThrow();
  });

  it("should find a car by id", async () => {
    const car = await prisma.car.findFirst();
    expect(car).not.toBeNull();
    if (!car) return;
    const result = await carService.findOne(car.id.toString());
    expect(result.id).toEqual(car?.id);
  });

  it("should find a car by code", async () => {
    const car = await prisma.car.findFirst();
    expect(car).not.toBeNull();
    if (!car) return;
    const result = await carService.findOne(car.code);
    expect(result.id).toEqual(car?.id);
  });

  it("should find all cars", async () => {
    const result = await carService.findAll();
    expect(result).toBeInstanceOf(Array);
  });

  it("should update a car", async () => {
    const finish = await prisma.finish.create({
      data: {
        name: "Finish 62",
        description: "This is a finish 62 ",
        price: 9000,
      },
    });
    expect(finish).not.toBeNull();

    const model = await prisma.model.create({
      data: {
        name: "Model 83",
        description: "This is a model 83",
        price: 14000,
        type: "HATCH",
      },
    });

    expect(model).not.toBeNull();

    const battery = await prisma.battery.create({
      data: {
        name: "Battery 993",
        description: "This is a battery 993",
        capacity: 11000,
        power: 400,
        price: 1300,
      },
    });

    expect(battery).not.toBeNull();

    const car = await prisma.car.create({
      data: {
        code: "EOA",
        finish: {
          connect: { id: finish.id },
        },
        model: {
          connect: { id: model.id },
        },
        battery: {
          connect: { id: battery.id },
        },
      },
    });

    expect(car).not.toBeNull();

    const req = {
      code: "GTU",
      finish: finish.id,
      model: model.id,
      battery: battery.id,
    };
    const result = await carService.update(car.id, req);
    expect(result.code).toEqual(req.code);
    expect(result).not.toBeNull();
    expect("EOA").not.toEqual(req.code);
  });

  it("should delete a car", async () => {
    const finish = await prisma.finish.create({
      data: {
        name: "Finish 3",
        description: "This is a finish",
        price: 1000,
      },
    });
    expect(finish).not.toBeNull();

    const model = await prisma.model.create({
      data: {
        name: "Model 3",
        description: "This is a model",
        price: 1000,
        type: "SUV",
      },
    });

    expect(model).not.toBeNull();

    const battery = await prisma.battery.create({
      data: {
        name: "Battery 3",
        description: "This is a battery",
        capacity: 1000,
        power: 1000,
        price: 1000,
      },
    });

    expect(battery).not.toBeNull();

    const car = await prisma.car.create({
      data: {
        code: "DOWN",
        finish: {
          connect: { id: finish.id },
        },
        model: {
          connect: { id: model.id },
        },
        battery: {
          connect: { id: battery.id },
        },
      },
    });

    expect(car).not.toBeNull();

    await carService.delete(car.id);
    const result = await prisma.car.findUnique({
      where: { id: car.id },
    });

    expect(result).toBeNull();
  });

  it("configure a car", async () => {
    const model = await prisma.model.create({
      include: {
        finishes: {
          include: { batteries: true, colors: true },
        },
      },
      data: {
        name: "Model 3",
        description: "This is a model",
        price: 1000,
        type: "SUV",
        finishes: {
          create: [
            {
              name: "Finish 3",
              description: "This is a finish",
              price: 1000,
              batteries: {
                create: [
                  {
                    name: "Battery 3",
                    description: "This is a battery",
                    capacity: 1000,
                    power: 1000,
                    price: 1000,
                  },

                  {
                    name: "Battery 4",
                    description: "This is a battery",
                    capacity: 1000,
                    power: 1000,
                    price: 1000,
                  },
                ],
              },
              colors: {
                create: [
                  {
                    code: "RED",
                    name: "Color 1",
                    hexa: "000000",
                    description: "This is a color",
                    price: 1000,
                  },
                  {
                    code: "BLUE",
                    hexa: "FF0000",
                    name: "Color 2",
                    description: "This is a color",
                    price: 1000,
                  },
                ],
              },
            },
            {
              name: "Finish 2",
              description: "This is a finish",
              price: 9000,
              batteries: {
                create: [
                  {
                    name: "Battery 5",
                    description: "This is a battery",
                    capacity: 1000,
                    power: 1000,
                    price: 1000,
                  },
                ],
              },
              colors: {
                create: [
                  {
                    code: "GRE",
                    name: "Color 3",
                    description: "This is a color",
                    hexa: "000000",
                    price: 1000,
                  },
                  {
                    code: "BRO",
                    name: "Color 4",
                    description: "This is a color",
                    hexa: "FF0000",
                    price: 1000,
                  },
                ],
              },
            },
          ],
        },
      },
    });

    expect(model).not.toBeNull();
    const car = await prisma.car.create({
      data: {
        code: "FLP",
        finish: {
          connect: { id: model.finishes[0].id },
        },
        model: {
          connect: { id: model.id },
        },
        battery: {
          connect: { id: model.finishes[0].batteries[0].id },
        },
      },
    });

    expect(car).not.toBeNull();

    const car2 = await prisma.car.create({
      data: {
        code: "MKE",
        finish: {
          connect: { id: model.finishes[1].id },
        },
        model: {
          connect: { id: model.id },
        },
        battery: {
          connect: { id: model.finishes[1].batteries[0].id },
        },
      },
    });

    expect(car2).not.toBeNull();

    const req = {
      model: model.id,
    };

    const req2 = {
      finish: model.finishes[1].id,
      model: model.id,
      battery: model.finishes[1].batteries[0].id,
      color: model.finishes[1].colors[1].id,
    };

    const result: CarConfiguredResponse | Response = await carService.configure(
      req
    );
    const result2: CarConfiguredResponse | Response =
      await carService.configure(req2);

    const result3: CarConfiguredResponse | Response =
      await carService.configure({});

    expect(result.code).toEqual(200);
    expect(result2.code).toEqual(200);
    expect(result3.code).toEqual(400);
    const finishSelected = (
      result as CarConfiguredResponse
    ).value.finishes.find((f) => f.state.selected === true);
    const batterySelected = (
      result as CarConfiguredResponse
    ).value.batteries.find((f) => f.state.selected === true);
    const colorSelected = (result as CarConfiguredResponse).value.colors.find(
      (f) => f.state.selected === true
    );
    expect(finishSelected?.id).toEqual(model.finishes[0].id);
    expect(batterySelected?.id).toEqual(model.finishes[0].batteries[0].id);
    expect(colorSelected?.id).toEqual(model.finishes[0].colors[0].id);

    const finishSelected2 = (
      result2 as CarConfiguredResponse
    ).value.finishes.find((f) => f.state.selected === true);
    const batterySelected2 = (
      result2 as CarConfiguredResponse
    ).value.batteries.find((f) => f.state.selected === true);
    const colorSelected2 = (result2 as CarConfiguredResponse).value.colors.find(
      (f) => f.state.selected === true
    );

    expect(finishSelected2?.id).toEqual(model.finishes[1].id);
    expect(batterySelected2?.id).toEqual(model.finishes[1].batteries[0].id);
    expect(colorSelected2?.id).toEqual(model.finishes[1].colors[1].id);
  });
});
