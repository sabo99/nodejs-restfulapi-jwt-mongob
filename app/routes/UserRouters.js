const router = require('express').Router();
const { AuthJWT, Validations } = require('../middlewares');
const UserController = require('../controllers/UserController');

router.get('/public', [], UserController.getPublic);

router.get('/list', [AuthJWT.verifyToken], UserController.getUsers);

router.get(
    '/find',
    [AuthJWT.verifyToken, Validations.findWithQueryId],
    UserController.getUser,
);

router.put(
    '/:id/update',
    [
        AuthJWT.verifyToken,
        Validations.findWithParamsId,
        Validations.checkValueUpated,
    ],
    UserController.updateUser,
);

router.patch(
    '/:id/update',
    [
        AuthJWT.verifyToken,
        Validations.findWithParamsId,
        Validations.checkValueUpated,
    ],
    UserController.updateUser,
);

router.delete(
    '/:id/delete',
    [AuthJWT.verifyToken, Validations.findWithParamsId],
    UserController.deleteUser,
);

module.exports = router;
