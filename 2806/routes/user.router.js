const router = require('express').Router();

const { userController } = require('../controllers');
const { userMiddlewar } = require('../middlewars');

router.post('/', userMiddlewar.checkEmailBusy, userController.createUser);
router.get('/', userController.getAllUsers);
router.get('/:_id', userMiddlewar.checkIsUserPresent, userController.getUserById);
router.put('/:_id', userMiddlewar.checkIsUserPresent, userController.updateUserById);
router.delete('/:_id', userMiddlewar.checkIsUserPresent, userController.deleteUserById);

module.exports = router;
