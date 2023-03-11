const { body, validationResult } = require('express-validator');

const validationResultExpress = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    next();
};

const bodyLoginValidator = [
    body("email", "The email format is incorrect.").trim().isEmail().normalizeEmail(),
    body("password", "The password must be at least 8 characters long, contain at least one uppercase letter, one number, and one special character.").trim().isStrongPassword(),
    validationResultExpress,
];

const bodyRegisterValidator = [
    body("email", "The email format is incorrect.").trim().isEmail().normalizeEmail(),
    body("password", "The password must be at least 8 characters long, contain at least one uppercase letter, one number, and one special character.").trim().isStrongPassword(),
    validationResultExpress,
];

module.exports = { bodyLoginValidator, bodyRegisterValidator, validationResultExpress };