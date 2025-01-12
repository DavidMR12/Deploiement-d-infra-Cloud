import { Finish } from "./Finish";

/**
 * This is the color entity
 */
export type Color = {
  id: number;
  code: string;
  name: string;
  description: string;
  hexa: string;
  price: number;
  finishes: Finish[];
};

/**
 * This is the schema for the color on prisma
 * @type {any}
 * @property {boolean} id
 * @property {boolean} code
 * @property {boolean} name
 * @property {boolean} description
 * @property {boolean} price
 * @property {boolean} hexa
 * @property {object} finishes
 * @property {boolean} finishes.id
 * @property {boolean} finishes.description
 * @property {boolean} finishes.name
 * @property {boolean} finishes.price
 * @memberof module:Entity/Color
 * @name colorSchema
 */
export const colorSchema: any = {
  id: true,
  code: true,
  name: true,
  description: true,
  price: true,
  hexa: true,
  finishes: {
    select: {
      id: true,
      description: true,
      name: true,
      price: true,
    },
  },
};
