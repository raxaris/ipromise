const {Comment} = require("../model/models")
const ApiError = require("../utils/error/apiError")

class CommentController{
    async createComment(req, res, next) {
        try{
            const {content, promiseId, userId} = req.body
            const comment = await Comment.create({content, promiseId, userId})
            return res.json(comment)
        } catch (e) {
            next(ApiError.badRequest("Error creating comment"))
        }
    }

    async getAllComments(req, res, next) {
        try {
            let {promiseId, limit, page} = req.query
            page = page || 1
            limit = limit || 10
            let offset = page * limit - limit
            let comments = await comments.findAndCountAll({where: {promiseId}, limit, offset})
            return res.json(comments)
        } catch (e) {
            next(ApiError.internal("Error getting comments"))
        }
    }

    async getCommentByID(req, res, next) {
        try {
            const { id } = req.params;
            const comment = await Comment.findByPk(id);

            if (!comment) {
                return next(ApiError.notFound("Comment not found"));
            }

            res.json(comment);
        } catch (e) {
            console.error(e);
            next(ApiError.internal("Error getting comment"));
        }
    }

    async updateComment(req, res, next) {
        const { id } = req.params;
        const { content } = req.body;
        try {
            const comment = await Comment.findByPk(id);
            if (!comment) {
                return next(ApiError.badRequest("Comment with this id does not exist"))
            }

            await comment.update({ content });
            res.status(200).json({ message: 'Comment updated successfully', comment: comment});
        } catch (e) {
            console.error(e);
            next(ApiError.internal("Error updating comment"))
        }
    }

    async deleteComment(req, res, next) {
        const { id } = req.params;
        if (!id) {
            return next(ApiError.badRequest("Comment ID is required"));
        }
        try {
            const comment = await Comment.findByPk(id);
            if (!comment) {
                return next(ApiError.notFound("Comment not found"));
            }
            await comment.destroy();
            res.status(200).json({ message: 'Comment deleted successfully' });
        } catch (e) {
            console.error(e);
            next(ApiError.internal("Deleting comment error"));
        }
    }
}

module.exports = new CommentController();