const router = require('express').Router();

const { authController } = require('../controllers');
const { authMiddlewar, userMiddlewar } = require('../middlewars');

router.post('/login', userMiddlewar.getUserByDynamicParam('email'), authController.login);
router.post('/logout', authMiddlewar.checkAccessToken, authController.logout);
router.post('/refresh', authMiddlewar.checkAccessToken, authController.refresh);

module.exports = router;

// 1. взяти header
// 2. перевірити на валідність
// 3. знайти в базі
// 4. стерти старий рефреш
// 5. згенерувати новий
// 6. записати в базу
// 7. віддати на фронт
