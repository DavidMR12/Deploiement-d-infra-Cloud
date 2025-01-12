import { Battery } from "./Battery";
import { Finish } from "./Finish";
import { Model, ModelType } from "./Model";

/**
 * This is the car entity
 * @typedef {Object} Car
 * @property {number} id
 * @property {string} code
 * @property {string} name
 * @property {string} description
 * @property {Model} model
 * @property {Battery} battery
 * @property {Finish} finish
 * @memberof module:Entity/Car
 * @name Car
 * @see Model
 * @see Battery
 * @see Finish
 * @see module:Entity/Model.Model
 * @see module:Entity/Battery.Battery
 * @see module:Entity/Finish.Finish
 */
export type Car = {
  id: number;
  code: string;
  name: string;
  description: string;
  model: Model;
  battery: Battery;
  finish: Finish;
};

/**
 * This is the schema for the car on prisma
 * @type {any}
 * @property {boolean} id
 * @property {boolean} code
 * @property {boolean} name
 * @property {boolean} description
 * @property {object} model
 * @property {object} battery
 * @property {object} finish
 */
export const carSchema: any = {
  id: true,
  code: true,
  model: {
    select: {
      id: true,
      name: true,
      description: true,
      type: true,
      price: true,
    },
  },
  battery: {
    select: {
      id: true,
      description: true,
      name: true,
      power: true,
      capacity: true,
      price: true,
    },
  },
  finish: {
    select: {
      id: true,
      name: true,
      description: true,
      price: true,
    },
  },
};

/**
 * This is the schema for the car configuration on prisma
 */
export const carConfigureSchema: any = {
  id: true,
  name: true,
  description: true,
  price: true,
  type: true,
  finishes: {
    select: {
      id: true,
      description: true,
      price: true,
      name: true,
      batteries: {
        select: {
          id: true,
          name: true,
          description: true,
          power: true,
          capacity: true,
          price: true,
        },
        orderBy: {
          id: "asc",
        },
      },
      colors: {
        select: {
          id: true,
          code: true,
          name: true,
          hexa: true,
          description: true,
          price: true,
        },
        orderBy: {
          id: "asc",
        },
      },
    },
    orderBy: {
      id: "asc",
    },
  },
  cars: {
    select: {
      code: true,
      model: {
        select: {
          id: true,
        },
      },
      battery: {
        select: {
          id: true,
        },
      },
      finish: {
        select: {
          id: true,
        },
      },
    },
  },
};

/**
 * This is a object state to car configuration item
 */
export type State = {
  selected: boolean;
  unavailable: boolean;
};

/**
 * This is the model configuration
 * @typedef {Object} ModelConfigure
 * @property {string} code
 * @property {string} description
 * @property {ModelType} type
 *  @property {number} price
 * @property {State} state
 * @memberof module:Entity/Car
 * @name ModelConfigure
 */
export type ModelConfigure = {
  id: number;
  name: string;
  description: string;
  type: ModelType;
  price: number;
};

/**
 * This is the battery configuration
 * @typedef {Object} BatteryConfigure
 * @property {string} code
 * @property {string} description
 * @property {number} power
 * @property {number} name
 * @property {number} capacity
 * @property {number} price
 * @property {State} state
 * @memberof module:Entity/Car
 * @name BatteryConfigure
 */
export type BatteryConfigure = {
  id: number;
  description: string;
  power: number;
  name: string;
  capacity: number;
  price: number;
  state: State;
};

/**
 * This is the finish configuration
 * @typedef {Object} FinishConfigure
 * @property {string} code
 * @property {string} description
 * @property {number} price
 * @property {State} state
 * @memberof module:Entity/Car
 * @name FinishConfigure
 */
export type FinishConfigure = {
  id: number;
  description: string;
  name: string;
  price: number;
  state: State;
};

/**
 * This is the color configuration
 * @typedef {Object} ColorConfigure
 * @property {string} code
 * @property {string} name
 * @property {string} description
 * @property {number} price
 * @property {State} state
 * @memberof module:Entity/Car
 * @name ColorConfigure
 */
export type ColorConfigure = {
  id: number;
  code: string;
  name: string;
  hexa: string;
  description: string;
  price: number;
  state: State;
};

/**
 * This is the car configuration response
 * @typedef {Object} CarConfiguredResponse
 * @property {string} code
 * @property {CarConfigured} value
 * @memberof module:Entity/Car
 * @name CarConfiguredResponse
 * @see CarConfigured
 * @see module:Entity/Car.CarConfigured
 */
export type CarConfiguredResponse = {
  code: number;
  value: CarConfigured;
};

/**
 * This is the car configuration
 * @typedef {Object} CarConfigure
 * @property {string} code
 * @property {number} price
 * @property {ModelConfigure} model
 * @property {BatteryConfigure} battery
 * @property {FinishConfigure} finish
 * @memberof module:Entity/Car
 * @name CarConfigure
 * @see ModelConfigure
 * @see BatteryConfigure
 * @see FinishConfigure
 * @see module:Entity/Car.ModelConfigure
 * @see module:Entity/Car.BatteryConfigure
 * @see module:Entity/Car.FinishConfigure
 */
export type CarConfigured = {
  uic: string;
  price: number;
  model: ModelConfigure;
  image: string;
  batteries: BatteryConfigure[];
  finishes: FinishConfigure[];
  colors: ColorConfigure[];
};
