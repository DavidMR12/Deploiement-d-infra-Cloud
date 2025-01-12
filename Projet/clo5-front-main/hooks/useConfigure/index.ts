import { useQuery } from "@tanstack/react-query";
import { ChoicesConfiguration, Status } from "types/catalogTypes";

type queryParams = {
  choices?: ChoicesConfiguration | {};
  code: string;
};

const fetchConfigure = async ({ code, choices }: queryParams) => {
  // reset endpoint
  if (typeof choices === "undefined") {
    choices = {
      model: code,
    };
  } else {
    (choices as ChoicesConfiguration).model = code as string;
  }
  const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/car/configure`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(choices),
  }).catch((error) => {
    console.error("Error fetching models", error);
  });

  if (!data) {
    return {
      status: Status.MODELS_NOT_FOUND,
      value: [],
    };
  }
  const response = await data.json();

  if (response.code !== 200) {
    return {
      status: Status.MODEL_NOT_FOUND,
      value: [],
    };
  }

  return {
    status: Status.SUCCESS,
    value: response.value,
  };
};

const useConfigure = ({ code, choices }: queryParams) => {
  return useQuery({
    queryKey: ["configure", { code, choices }],
    queryFn: () => fetchConfigure({ code, choices }),
    refetchOnWindowFocus: false,
  });
};

export { fetchConfigure, useConfigure };
