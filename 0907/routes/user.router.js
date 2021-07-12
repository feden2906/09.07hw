const router = require('express').Router();

const { nameConstants: { CREATE_USER, UPDATE_USER } } = require('../constants');
const { userController } = require('../controllers');
const { authMiddlewar, userMiddlewar } = require('../middlewars');

router.post('/', userMiddlewar.checkDataValidity(CREATE_USER), userMiddlewar.checkEmailBusy, userController.createUser);
router.get('/', userController.getAllUsers);

router.use('/:userId', userMiddlewar.getUserByDynamicParamWithoutPassword('userId', 'params', '_id'));

router.get('/:userId', userController.getUserById);
router.put(
  '/:userId',
  authMiddlewar.checkAccessToken,
  userMiddlewar.checkDataValidity(UPDATE_USER),
  userController.updateUserById
);
router.delete('/:userId', authMiddlewar.checkAccessToken, userController.deleteUserById);

module.exports = router;
