const express = require('express');
const { createUser, loginUser, addUserAddress, addUserOrders, refreshAccessToken, logOut, resetPasswordRequest, resetPassword } = require('../controllers/User');
const { jwtVerify } = require('../middleware/auth');
const userRouter = express.Router();

userRouter.post('/register', createUser);
userRouter.post('/loginuser', loginUser);
userRouter.post('/refreshaccesstoken', refreshAccessToken);
userRouter.post('/logout',jwtVerify, logOut);
userRouter.post('/reset-password-request', resetPasswordRequest);
userRouter.post('/reset-password', resetPassword);
userRouter.patch('/adduseraddress/:id', addUserAddress);
userRouter.patch('/adduserorders/:id', addUserOrders);

exports.userRouter = userRouter;