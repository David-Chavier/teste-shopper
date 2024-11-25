export const validateEstimateValidator = (
  customer_id: string,
  origin: string,
  destination: string
) => {
  if (!customer_id) {
    return {
      code: 400,
      data: {
        error_code: "INVALID_DATA",
        error_description: "Customer ID é obrigatório.",
      },
    };
  }

  if (!origin || !destination) {
    return {
      code: 400,
      data: {
        error_code: "INVALID_DATA",
        error_description: "Origin e destination são obrigatórios.",
      },
    };
  }

  if (origin === destination) {
    return {
      code: 400,
      data: {
        error_code: "INVALID_DATA",
        error_description: "Origin e destination não podem ser iguais.",
      },
    };
  }

  return null;
};
