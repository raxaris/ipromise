const {User} = require("../model/models");
const ApiError = require('../utils/error/apiError');
const bcrypt = require("bcrypt");

class UserController {
    async createUser(req, res, next ){
        try{
            let {username, email, password, roleId} = req.body

            if (!username || !email || !password || !roleId){
                return next(ApiError.badRequest("Fill all required fields"))
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
            return res.status(200).json(user);

        } catch (e) {
            next(ApiError.badRequest("Registering error"))
        }
    }

    async getUsers(req, res, next){
        try {
            const users = await User.findAndCountAll();
            res.json(users);
            console.log("Users were requested.");
        } catch (e) {
            next(ApiError.internal("Error getting users"))
        }
    }

    async getUserById(req, res, next) {
        try {
            const { id } = req.params;
            const user = await User.findByPk(id);

            if (!user) {
                return next(ApiError.notFound("User not found"));
            }

            res.json(user);
        } catch (e) {
            console.error(e);
            next(ApiError.internal("Error getting user"));
        }
    }


    async updateUser(req, res, next) {
        const { id } = req.params;
        const { username, email, roleId } = req.body;
        try {
            const user = await User.findOne({ where: { id } });
            if (!user) {
                return next(ApiError.badRequest("User with this id does not exist"))
            }

            if (email && email !== user.email) {
                const emailInstance = await User.findOne({ where: { email } });
                if (emailInstance) {
                    return next(ApiError.badRequest("User with this email already exists"))
                }
            }

            if (username && username !== user.username) {
                const usernameInstance = await User.findOne({ where: { username } });
                if (usernameInstance) {
                    return next(ApiError.badRequest("User with this username already exists"))
                }
            }

            await user.update({ username, email, roleId });
            res.status(200).json({ message: 'User updated successfully', user: user});
        } catch (e) {
            console.error(e);
            next(ApiError.internal("Error updating user"))
        }
    }

    async deleteUser(req, res, next) {
        const { id } = req.params;
        if (!id) {
            return next(ApiError.badRequest("User ID is required"));
        }
        try {
            const user = await User.findOne({ where: { id } });
            if (!user) {
                return next(ApiError.notFound("User not found"));
            }
            await user.destroy();
            res.status(200).json({ message: 'User deleted successfully' });
        } catch (e) {
            console.error(e);
            next(ApiError.internal("Deleting user error"));
        }
    }

}

module.exports = new UserController();