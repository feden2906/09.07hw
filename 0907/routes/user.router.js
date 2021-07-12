const router = require('express').Router();

const { nameConstants: { CREATE_USER, UPDATE_USER } } = require('../constants');
const { userController } = require('../controllers');
const { userMiddlewar } = require('../middlewars');

router.post('/', userMiddlewar.checkDataValidity(CREATE_USER), userMiddlewar.checkEmailBusy, userController.createUser);
router.get('/', userController.getAllUsers);

router.use('/:userId', userMiddlewar.getUserByDynamicParam('userId', 'params', '_id'));

router.get('/:userId', userController.getUserById);
router.put('/:userId', userMiddlewar.checkDataValidity(UPDATE_USER), userController.updateUserById);
router.delete('/:userId', userController.deleteUserById);

module.exports = router;
