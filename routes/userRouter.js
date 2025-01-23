const express = require('express');
const router = express.Router();
const {
    getAllUsers,
    getUser,
    updateUserInfo,
    searchUsers,
    addUser,
    loginUser,
    logoutUser,
    forgotPasswordHandler,
    verifyPasswordReset
} = require('../controllers/userController');
const authSession = require('../middlewares/authSession');
const roleManager = require('../middlewares/roleManager');

router.get('/', getAllUsers);
router.get('/user/:id', getUser);
// router.put('/user/:id', [authSession, roleManager], updateUserInfo)
// router.get('/search', [authSession], searchUsers);
router.put('/user/:id', updateUserInfo);
router.get('/search', searchUsers);
router.post('/user/add', addUser);
router.post('/user/login', loginUser);
router.post('/user/logout', [authSession], logoutUser);
router.post('/user/forgot_password', forgotPasswordHandler);
router.post('/user/reset_password/:id', verifyPasswordReset);

module.exports = router;