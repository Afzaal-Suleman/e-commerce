const User = require("../model/User");
const { sendMail } = require("../services/common");
const UserDTO = require("../utils/UserDTO")
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const generateAccessAndRefreshToken = async (userId) => {
    try {

        const user = await User.findById(userId)

        const accessToken = user.generateAccessToken()

        const refreshToken = user.generateRefreshToken()
        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return { accessToken, refreshToken }
    } catch (error) {
        console.log({ 'error': error });

    }
}
exports.createUser = async (req, res) => {
    try {
        const { name, email, role, password, address, orderss } = req.body
        const obj = {
            name,
            email,
            role: role.toLowerCase().replace(/\s+/g, ''),
            password,
            address,
            orderss
        }
        const findUser = await User.findOne({ email: email })
        if (!findUser) {
            const user = new User(obj);
            const savedUser = await user.save();
            const userDto = new UserDTO(savedUser)
            if (savedUser) {
                return res.status(200).json({ message: 'user saved uccessfully', userDto })
            }
        }
        return res.status(401).json({ message: 'you Already have account' })
    } catch (error) {
        res.status(500).send({ message: 'Error saving user', error: error });
    }
}

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })
        // const userDto = new UserDTO(user)
        if (user) {
            if (await user.matchPassword(password)) {
                const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id)
                const logedinUser = await User.findById(user._id).select("-password -refreshToken")

                const options = {
                    httpOnly: true, // Cookie can't be accessed via JavaScript
                    secure: true,  // Cookie only sent over HTTPS
                    sameSite: 'Strict' // Cookie sent only for same-site requests
                };
                return res.status(200)
                    .cookie("accessToken", accessToken, options)
                    .cookie("refreshToken", refreshToken, options)
                    .json({
                        data: {
                            user: logedinUser,
                            accessToken: accessToken,
                            refreshToken: refreshToken,
                            message: "User logged in successfully"
                        }
                    });

                // return res.status(200).json({ message: 'User logged in successfully', userDto });
            } else {
                return res.status(401).json({ message: 'Invalid username or password' });
            }
        } else {
            return res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Error logging in user', error: error.message });
    }
}

exports.addUserAddress = async (req, res) => {
    try {

        const { id } = req.params;
        const userdb = await User.findByIdAndUpdate(id, req.body, { new: true });

        const user = new UserDTO(userdb)

        if (user) {
            return res.status(200).json({
                data: {
                    user,
                    accessToken,
                    refreshToken,
                    message: "user saved uccessfully"
                }
            })
        }

    } catch (error) {
        return res.status(500).json({ message: 'Error logging in user', error: error });
    }

}

exports.addUserOrders = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByIdAndUpdate(id, req.body, { new: true });

        const userDto = new UserDTO(user)

        if (user) {
            return res.status(200).json({ message: 'user saved uccessfully', userDto })
        }

    } catch (error) {
        return res.status(500).json({ message: 'Error logging in user', error: error.message });

    }
}

exports.refreshAccessToken = async (req, res) => {
    const incomingRefreshToken = req.cookies?.refreshToken || req.body.refreshToken;

    if (!incomingRefreshToken) {
        return res.status(401).json({ message: "Unauthorized request" });
    }

    try {
        const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);

        const userdb = await User.findById(decodedToken._id);

        if (!userdb) {
            return res.status(401).json({ message: "Invalid refresh token" });
        }

        if (incomingRefreshToken !== userdb.refreshToken) {
            return res.status(401).json({ message: "Refresh token is expired or used" });
        }

        const { accessToken, refreshToken } = await generateAccessAndRefreshToken(userdb._id);
        const user = new UserDTO(userdb)


        const options = {
            httpOnly: true, // Cookie can't be accessed via JavaScript
            secure: true,   // Cookie only sent over HTTPS
            sameSite: 'Strict' // Cookie sent only for same-site requests
        };

        return res.status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json({
                data: {
                    user,
                    accessToken,
                    refreshToken,
                    message: "Access token refreshed successfully"
                }
            });

    } catch (error) {
        return res.status(401).json({ message: "Invalid refresh token server", error: error });
    }
}
exports.logOut = async (req, res) => {
    const user = await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: "" //this removes the field from document
            }
        },
        { new: true }
    )
    if (!user) {
        return res.status(401).json({ message: "User not found" })
    }
    const options = {
        httpOnly: true,
        secure: true
    }
    return res.status(200).clearCookie("accessToken", options).clearCookie("refreshToken", options)
        .json({ data: { user: null, message: "User Logged Out" } })
}

exports.resetPasswordRequest = async (req, res) => {


    const email = req.body.email;
    const user = await User.findOne({ email: email })
    if (user) {
        const token = crypto.randomBytes(48).toString('hex');
        user.resetPasswordToken = token;
        await user.save()
        //then
        const to = email;
        //send a email and token by query
        const resetPage = "http://localhost:5173/reset-password?token="+token+"&email="+email;
        const subject = "Reset password for e-commerce";
        const text = "hello";
        const html = `<p>Click <a href='${resetPage}'>here</a> to reset your password</p>`;
        // lets send email and a token in the mail body so we can verify that user has clicked right link
        if (email) {
            try {
                const response = await sendMail({ to, subject, text, html });
                res.status(200).json(response);
            } catch (error) {
                res.status(500).json({ error: "Failed to send reset email" });
            }
        } else {
            res.sendStatus(400);
        }
    }else{
        res.send(400).json({message: "email not found"});
    }
};


exports.resetPassword = async (req, res) => {
    const email = req.body.email
    const password = req.body.password
    const token = req.body.token
    const user = await User.findOne({ email: email, resetPasswordToken: token })
    if(user){
        user.password = password;
        await user.save()
        
        const subject = 'password successfully reset for e-commerce';
        const text = "ok";
        const html = `<p>Successfully able to reset your password</p>`;
        if (email) {

            try {
                const response = await sendMail({ to:email, subject, text, html });
                if(response){
                    res.status(200)
                }
                
            } catch (error) {
                res.status(500).json({ error: "Failed to send reset email" });
            }
        } else {
            res.sendStatus(400);
        }
    }else{
        res.status(400).json({message:"user invalid"})
    }

};
