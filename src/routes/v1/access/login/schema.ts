// ARCHIVOS SQUEMA SIRVEN PARA VALIDAR LA DATA DE LOS FORMULARIOS
import Joi from "joi";

export default {
  loginCredentials: Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
  }),
};
