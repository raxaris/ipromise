const {User, Role, ResetToken} = require("../model/models");
const { Op } = require("sequelize");
const ApiError = require('../error/apiError');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

const sendResetEmail = require('../mailer/mailer');

class AuthController {
    async registration(req, res, next) {
        try{
            let {username, email, password, confirmPassword} = req.body
            let roleId = 2

            if (!username) {
                return next(ApiError.badRequest("Username is required"))
            }

            if (!(password.length >= 8)) {
                return next(ApiError.badRequest("Password must be at least 8 characters long"))
            }

            if (!(password === confirmPassword)) {
                return next(ApiError.badRequest("Passwords do not match"))
            }

            const emailPattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]*@[a-zA-Z0-9]*\.[a-z]{2,4}$/;
            if(!emailPattern.test(email)){
                return next(ApiError.badRequest("Invalid email address"))
            }

            const emailCandidate = await User.findOne({ where: { email } })
            if (emailCandidate) {
                return next(ApiError.badRequest("User with this email already exists"))
            }

            const usernameCandidate = await User.findOne({ where: { username } })
            if (usernameCandidate) {
                return next(ApiError.badRequest("User with this username already exists"))
            }

            const hashPassword = await bcrypt.hash(password, 10)
            const user = await User.create({username, email, password: hashPassword, roleId})
            const token = generateJWT(user.id, user.username, user.email, await getRoleName(user.roleId))
            res.cookie('jwt', token, {
                maxAge: 86400000,
                httpOnly: true,
            });
            return res.status(200).json({token});

        } catch (e) {
            next(ApiError.badRequest("Registering error"))
        }
    }

    async login(req, res, next) {
        try{
            console.log(req.body)
            const {login, password} = req.body
            if (!login || !password) {
                return next(ApiError.badRequest("Login and password must be completed"))
            }

            const user = await User.findOne({
                where: {
                    [Op.or]: [
                        {email: login},
                        {username: login}
                    ]
                }
            })
            if (!user) {
                return next(ApiError.badRequest("Invalid login"))
            }

            let comparePassword = await bcrypt.compare(password, user.password)
            if (!comparePassword) {
                return next(ApiError.badRequest("Invalid password"))
            }

            const token = generateJWT(user.id, user.username, user.email, await getRoleName(user.roleId))
            res.cookie('jwt', token, {
                maxAge: 86400000,
                httpOnly: true,
            });
            return res.status(200).json({token});
        } catch (e) {
            next(ApiError.internal("Logging in error"))
        }
    }

    async forgotPassword(req, res, next) {
        const { email } = req.body;
        try {
            const user = await User.findOne({ where: { email } });

            if (!user) {
                return next(ApiError.notFound("User not found"));
            }

            const token = uuidv4()
            const expires = Date.now() + 3600000;

            let resetToken = await ResetToken.findOne({ where: { userId: user.id } });

            if (resetToken) {
                resetToken.token = token;
                resetToken.expires = expires;
                await resetToken.save();
            } else {
                await ResetToken.create({
                    token: token,
                    expires: expires,
                    userId: user.id
                });
            }

            await sendResetEmail(email, token);

            res.status(200).json({ message: 'Password reset link sent to your email' });
        } catch (error) {
            next(ApiError.internal("Resetting error"))
        }
    }

    async resetPassword(req, res, next) {
        try {

            res.status(200).json({ message: 'Password reset link sent to your email' });
        } catch (error) {
            next(ApiError.internal("Resetting error"))
        }
    }
}

const generateJWT = (id, username, email, role) => {
    return jwt.sign(
        {id, username, email, role},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

const getRoleName = async (roleId, next) => {
    try {
        const role = await Role.findOne({ where: { id: roleId } });
        if (role) {
            return role.name;
        } else {
            return next(ApiError.badRequest("Invalid role"))
        }
    } catch (e) {
        return next(ApiError.internal("Finding role error"));
    }
};

module.exports = new AuthController();