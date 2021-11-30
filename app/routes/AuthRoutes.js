const router = require('express').Router();
const { Validations, DeviceDetector } = require('../middlewares');
const AuthController = require('../controllers/AuthController');

router.post(
    '/signup',
    [Validations.checkUsernameOrEmailExists, Validations.signUpValidation],
    AuthController.signUp,
);

router.post(
    '/signin',
    [Validations.signInValidation, DeviceDetector.index],
    AuthController.signIn,
);

module.exports = router;
