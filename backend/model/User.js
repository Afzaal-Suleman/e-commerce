const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const UserSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    role: {type: String, required: true, default: 'user'},
    password : {type: String},
    address: {type: [mongoose.Schema.Mixed]},
    orderss: {type: [mongoose.Schema.Mixed]},
    refreshToken:{ type: String },
    resetPasswordToken:{ type: String, default: '' }

})
UserSchema.pre('save', async function (next) {
    if(!this.isModified('password')){
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

UserSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};
UserSchema.methods.generateAccessToken = function () {
    try {
        return jwt.sign({
            _id : this._id,
            name: this.name,
            email: this.email,
            role: this.role
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
        
    )
    } catch (error) {
        console.error('Error generating access token:', error);
    }
}
UserSchema.methods.generateRefreshToken = function () {
    try {
        return jwt.sign({
            _id : this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
        
    )
    } catch (error) {
        console.error('Error generating access token:', error);
    }
}
module.exports = mongoose.model('User', UserSchema);