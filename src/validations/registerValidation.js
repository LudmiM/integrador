const { check, body, validationResult } = require("express-validator");
const { hashSync } = require('bcryptjs');
const db = require('./../database/models');

module.exports = [
    check("email")
        .notEmpty().withMessage('El email es obligatorio')
        .isEmail().withMessage('El email no es válido')
        .custom(async (value) => {
            const user = await db.User.findOne({ where: { email: value.trim().toLowerCase() } });
            if (user) {
                return Promise.reject('El email ya está registrado');
            }
        }),
    body("userPassword")
        .notEmpty().withMessage("La contraseña es obligatoria")
        .isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]+$/)
        .withMessage('La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial'),

    body("confirmPassword")
        .notEmpty().withMessage("La confirmación de contraseña es obligatoria")
        .custom((value, { req }) => {
            if (value !== req.body.userPassword) {
                return Promise.reject('Las contraseñas no coinciden.')
            }
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return false;
            }

            try {
                const email = req.body.email.trim().toLowerCase();
                const password = hashSync(req.body.userPassword, 10);
                const idRole = +req.body.userType;

                db.User.create({
                    email: email,
                    password: password,
                    idRole: idRole
                }).then(user => {
                    if (user) {
                        return true;
                    } else {
                        throw new Error('Error al crear el usuario');
                    }
                });
                return true;
            } catch (error) {
                console.log(error);
                return false; 
            }
        }),

    check("userType")
        .notEmpty().withMessage('Debe seleccionar un tipo de registro')

];
