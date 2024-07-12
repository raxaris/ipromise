const {Promise, User} = require("../model/models")
const {ApiError} = require("../utils/error/apiError")
class PromiseController{
    async createPromise(req, res, next) {
        try{
            const {content, deadline, userId} = req.body
            const promise = await Promise.create({content, deadline,userId})
            return res.json(promise)
        } catch (e) {
            next(ApiError.badRequest("Error creating promise"))
        }
    }

    async getAllPromises(req, res, next) {
        try {
            let {userId, limit, page, sorting} = req.query
            page = page || 1
            sorting = sorting || "ASC"
            // limit = limit || 10
            if (sorting !== "ASC" && sorting !== "DESC") {
                next(ApiError.badRequest("Invalid sorting type"))
                return
            }
            let offset = page * limit - limit
            let promises
            if (!userId) {
                promises = await Promise.findAll({order: [['createdAt', sorting]], limit, offset, include: [{ model: User, attributes: ['username'] }]})
            } else {
                promises = await Promise.findAll({where: {userId}, limit, offset, include: [{ model: User, attributes: ['username'] }]})
            }

            return res.json(promises)
        } catch (e) {
            console.log("Api Error", ApiError)
            next(ApiError.unauthorized())
        }
    }

    async getPromiseByID(req, res, next) {
        try {
            const { id } = req.params;
            const promise = await Promise.findByPk(id, {include: [{ model: User, attributes: ['username'] }]});

            if (!promise) {
                return next(ApiError.notFound("Promise not found"));
            }

            res.json(promise);
        } catch (e) {
            console.error(e);
            next(ApiError.internal("Error getting promise"));
        }
    }

    async updatePromise(req, res, next) {
        const { id } = req.params;
        const { content, deadline, likes, img } = req.body;
        try {
            const promise = await Promise.findByPk(id);
            if (!promise) {
                return next(ApiError.badRequest("Promise with this id does not exist"))
            }

            await promise.update({ content, deadline, likes, img });
            res.status(200).json({ message: 'Promise updated successfully', promise: promise});
        } catch (e) {
            console.error(e);
            next(ApiError.internal("Error updating promise"))
        }
    }

    async deletePromise(req, res, next) {
        const { id } = req.params;
        if (!id) {
            return next(ApiError.badRequest("Promise ID is required"));
        }
        try {
            const promise = await Promise.findByPk(id);
            if (!promise) {
                return next(ApiError.notFound("Promise not found"));
            }
            await promise.destroy();
            res.status(200).json({ message: 'Promise deleted successfully' });
        } catch (e) {
            console.error(e);
            next(ApiError.internal("Deleting promise error"));
        }
    }
}

module.exports = new PromiseController();