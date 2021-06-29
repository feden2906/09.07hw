const router = require('express').Router();

const { userController } = require('../controllers');

router.post('/', userController.createUser);
router.get('/', userController.getAllUsers);
router.get('/:_id', userController.getUserById);
router.put('/:_id', userController.updateUserById);
router.delete('/:_id', userController.deleteUserById);

module.exports = router;
