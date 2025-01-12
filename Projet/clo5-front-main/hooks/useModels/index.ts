import { Models, Status } from "types/catalogTypes";

const fetchModels = async () => {
  // reset endpoint
  const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/models`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).catch((error) => {
    console.error("Error fetching models", error);
  });

  if (!data) {
    return {
      status: Status.MODELS_NOT_FOUND,
      values: [],
    };
  }
  const response = await data.json();

  const datas: Models = {
    status: Status.SUCCESS,
    values: response,
  };

  return datas;
};

export { fetchModels };
