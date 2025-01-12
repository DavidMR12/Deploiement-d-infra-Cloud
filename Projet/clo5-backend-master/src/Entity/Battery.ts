import { Finish } from "./Finish";

/**
 * This is the schema for the battery entity
 */
export type Battery = {
  id: number;
  code: string;
  description: string;
  power: number;
  capacity: number;
  price: number;
  finishes: Finish[];
};

/**
 * This is the battery on prisma
 * @type {any}
 * @property {boolean} id
 * @property {boolean} code
 * @property {boolean} description
 * @property {boolean} power
 * @property {boolean} capacity
 * @property {boolean} price
 * @property {object} finishes
 * @property {boolean} finishes.id
 * @property {boolean} finishes.description
 */
export const batterySchema: any = {
  id: true,
  name: true,
  description: true,
  capacity: true,
  power: true,
  price: true,
  finishes: {
    select: {
      id: true,
      name: true,
      description: true,
      price: true,
    },
  },
};
