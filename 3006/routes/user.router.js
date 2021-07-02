const router = require('express').Router();

const { userController } = require('../controllers');
const { userMiddlewar } = require('../middlewars');

router.post('/', userMiddlewar.checkUserValidity, userMiddlewar.checkEmailBusy, userController.createUser);
router.get('/', userController.getAllUsers);

router.get('/:userId', userMiddlewar.checkIsUserPresent, userController.getUserById);
router.put('/:userId', userMiddlewar.checkIsUserPresent, userController.updateUserById);
router.delete('/:userId', userMiddlewar.checkIsUserPresent, userController.deleteUserById);

module.exports = router;
