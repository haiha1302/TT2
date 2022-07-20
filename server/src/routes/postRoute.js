const { postsController } = require('../controllers/postsController');
const { Auth } = require('../middleware/auth');
const { uploadServices } = require('../services/uploadServices')

const router = require('express').Router();

router.post('/create', postsController.createPost);

router.post('/uploadfiles', postsController.uploadFiles);
// router.get("/all", getAllPost);

router
    .route('/:id')
    .get(Auth.auth, postsController.postDetail)
    .put(Auth.auth, Auth.authEdit, postsController.updatePost)
    .delete(Auth.auth, Auth.authEdit, postsController.deletePost);

router.post('/:post_id/comment', Auth.auth, postsController.commentPost);

router.post('/:post_id/like', Auth.auth, postsController.toggle_like);

module.exports = router;
