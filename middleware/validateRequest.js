const { validationResult } = require('express-validator');

const validateRequest = (schema) => {
    return async (req, res, next) => {
        await schema.run(req);
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    };
};

module.exports = validateRequest;
