// validations/registerValidation.js

const { body, validationResult } = require('express-validator');

const registerValidationRules = () => {
  return [
    // Agrega reglas de validación aquí usando express-validator
    body('freelancer-firstname').notEmpty().withMessage('El nombre es obligatorio'),
    body('freelancer-lastname').notEmpty().withMessage('El apellido es obligatorio'),
    body('freelancer-email').isEmail().withMessage('Ingrese un correo electrónico válido'),
    // Agrega más reglas según sea necesario
  ];
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(422).json({
    errors: extractedErrors,
  });
};

module.exports = {
  registerValidationRules,
  validate,
};