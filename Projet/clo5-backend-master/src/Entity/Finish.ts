import { Model } from "./Model";

/**
 * This is the finish entity
 */
export type Finish = {
  id: number;
  code: string;
  description: string;
  price: number;
  models: Model[];
};

/**
 * This is the schema for the finish on prisma
 * @type {any}
 * @property {boolean} id
 * @property {boolean} code
 * @property {boolean} description
 * @property {boolean} price
 * @property {object} models
 * @property {boolean} models.id
 * @property {boolean} models.description
 * @property {boolean} models.price
 * @property {boolean} models.type
 * @memberof module:Entity/Finish
 * @name finishSchema
 */
export const finishSchema: any = {
  id: true,
  description: true,
  name: true,
  price: true,
  models: {
    select: {
      id: true,
      description: true,
      name: true,
      price: true,
      type: true,
    },
  },
};
