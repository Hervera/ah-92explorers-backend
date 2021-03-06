import express from 'express';
import commentController from '../../controllers/comment';
import { checkToken, checkHighlightAndComment } from '../../middlewares';

const router = express.Router();

/**
* @swagger
* /api/articles/{:slug}/comments:
*   post:
*     security:
*       - bearerAuth: []
*     tags:
*       - Article
*     name: Comment
*     summary: Enables user to comment on an article
*     consumes:
*       - application/json
*     parameters:
*       - name: ":slug"
*         in: path
*         description: article slug
*         required: true
*         type: string
*       - name: body
*         in: body
*         properties:
*           body:
*             type: string
*             example: I finally learnt how to train my dragon. Thanks
*         required:
*           - body
*     responses:
*       201:
*         description: commented
*       400:
*         description: commenting failed
*/
router.post('/articles/:slug/comments', checkToken, commentController.createComment);
router.get('/articles/:articleSlug/comments', commentController.getArticleComments);
router.get('/comments/:commentId', commentController.getSingleComment);
router.patch('/comments/:commentId', checkToken, commentController.updateComment);
router.delete('/comments/:commentId', checkToken, commentController.deleteComment);
router.post('/articles/:articleSlug/highlight/comments', checkToken, checkHighlightAndComment, commentController.highlightTextAndComment);

export default router;
