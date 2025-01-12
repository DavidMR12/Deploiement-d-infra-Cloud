/**
 * This is the model entity
 */
export type Model = {
  id: number;
  name: string;
  description: string;
  type: ModelType;
  price: number;
};

/**
 * This is the schema for the model on prisma
 * @type {any}
 * @property {boolean} id
 * @property {boolean} code
 * @property {boolean} description
 * @property {boolean} type
 * @property {boolean} price
 * @memberof module:Entity/Model
 * @name modelSchema
 */
export enum ModelType {
  SEDAN = "sedan",
  HATCH = "hatch",
  SUV = "suv",
}
