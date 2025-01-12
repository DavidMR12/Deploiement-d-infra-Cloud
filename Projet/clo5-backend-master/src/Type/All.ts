export type FieldReponse = {
  name: string;
  message: string;
};

export type ValidatorResponse = {
  sucess: boolean;
  fields?: FieldReponse[];
};

export type Response = {
  code: number;
  message: string;
};
