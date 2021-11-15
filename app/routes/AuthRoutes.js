const router = require('express').Router();
const { Validations } = require('../middlewares');
const AuthController = require('../controllers/AuthController');

router.post(
    '/signup',
    [Validations.checkUsernameOrEmailExists, Validations.signUpValidation],
    AuthController.signUp,
);

router.post('/signin', [Validations.signInValidation], AuthController.signIn);

module.exports = router;
