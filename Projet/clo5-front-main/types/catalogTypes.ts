export enum Status {
  MODEL_NOT_FOUND,
  MODELS_NOT_FOUND,
  SUCCESS,
}

export enum ModelType {
  SUV = "SUV",
  SEDAN = "SEDAN",
  HATCH = "HATCH",
}

export type ErrorTriggerOrSuccess = {
  status: Status;
};

export type Models = {
  status: Status;
  values: Model[];
};

export type Model = {
  id: string;
  image: string;
  name: string;
  description: string;
  price: number;
  type: ModelType;
};

export type ChoicesConfiguration = {
  finish?: string;
  battery?: string;
  color?: string;
  model?: string;
};

export type InitialModel = {
  modelName: string;
  brandColor: string;
  logoUrl: string;
};
