const validateLogin = (formData) => {
  const errors = {};

  if (!formData.cardNumber) {
    errors.cardNumber = "El campo usuario no puede estar vacío";
  } else if (formData.cardNumber.length < 19) {
    errors.cardNumber = "El usuario de contener minimo 16 caracteres.";
  }

  if (!formData.pin) {
    errors.pin = "El campo pin no puede estar vacío";
  } else if (!/^\d+$/.test(formData.pin)) {
    errors.pin = "El pin debe contener solo números";
  }

  return errors;
};

export default validateLogin;