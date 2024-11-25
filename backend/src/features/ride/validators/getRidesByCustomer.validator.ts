export const validateGetRidesByCustomerValidator = (customer_id: string, driver_id?: string) => {
  if (!customer_id?.trim()) {
    return {
      code: 400,
      data: {
        error_code: "INVALID_CUSTOMER",
        error_description: "O id do usuário não pode estar em branco.",
      },
    };
  }

  if (driver_id && !/^\d+$/g.test(driver_id)) {
    return {
      code: 400,
      data: {
        error_code: "INVALID_DRIVER",
        error_description: "O id do motorista informado é inválido. Deve ser um número válido.",
      },
    };
  }

  return null;
};
