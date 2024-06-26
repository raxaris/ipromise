const {Promise} = require("../model/models")
const {ApiError} = require("../error/apiError")

class PromiseController{
    async create(req, res, next) {
        try{
            const {content, deadline, userId} = req.body
            const promise = await Promise.create({content, deadline,userId})
            return res.json(promise)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res, next) {
        let {userId, limit, page, sorting} = req.query
        page = page || 1
        limit = limit || 10
        sorting = sorting || "ASC"

        if (sorting !== "ASC" && sorting !== "DESC") {
            next(ApiError.badRequest("Invalid sorting type"))
            return
        }

        let offset = page * limit - limit

        let promises
        if (!userId){
            promises = await Promise.findAndCountAll({order: [['createdAt', sorting]], limit, offset})
        } else {
            promises = await Promise.findAndCountAll({where:{userId}, limit, offset})
        }

        return res.json(promises)
    }

    async getByID(req, res) {
        const {id} = req.params
        const promise = await Promise.findOne({where:{id}})
        return res.json(promise)
    }
}

module.exports = new PromiseController();