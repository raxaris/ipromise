const {User, Promise} = require("../model/models");
const ApiError = require('../utils/error/apiError');
const bcrypt = require('bcrypt');
const path = require('path');
const fs = require('fs');

class ProfileController {
    async getUserProfile(req, res, next){
        const {username} = req.params;
        if (!username) {
            return next(ApiError.badRequest("User ID is required"));
        }
        try {
            const user = await User.findOne({
                where: { username },
                attributes: ['username', 'avatar', 'name', 'surname', 'about'],
                include: [
                    {
                        model: Promise,
                        attributes: ['id', 'content', 'deadline', 'img']
                    }
                ]
            });

            if (!user) {
                return next(ApiError.notFound("User not found"));
            }

            res.json(user);
        } catch(e) {
            next(ApiError.internal("Error getting user profile"))
        }
    }

    async updateUserProfile(req, res, next) {
        const { id } = req.params;
        const { name, surname, about } = req.body;

        if (!id) {
            return next(ApiError.badRequest("User ID is required"));
        }

        try {
            const user = await User.findByPk(id);

            if (!user) {
                return next(ApiError.notFound("User not found"));
            }

            if (req.files && req.files.avatar) {
                const avatar = req.files.avatar;
                const uploadPath = path.resolve(__dirname, '../uploads/avatars');

                if (!fs.existsSync(uploadPath)) {
                    fs.mkdirSync(uploadPath, { recursive: true });
                }

                const avatarPath = path.join(uploadPath, `${Date.now()}_${avatar.name}`);
                await avatar.mv(avatarPath);

                user.avatar = `/uploads/avatars/${path.basename(avatarPath)}`;
            }

            user.name = name || user.name;
            user.surname = surname || user.surname;
            user.about = about || user.about;

            await user.save();

            res.json({ message: "Profile updated successfully", user });
        } catch (e) {
            next(ApiError.internal("Error updating user profile"));
        }
    }


}

module.exports = new ProfileController();