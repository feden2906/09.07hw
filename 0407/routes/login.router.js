const router = require('express').Router();

const { loginController } = require('../controllers');
const { loginMiddlewar } = require('../middlewars');

router.post('/', loginMiddlewar.checkIsLoginValidity, loginMiddlewar.checkIsUserPresent, loginController.loginUser);

module.exports = router;
