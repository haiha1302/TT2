const {
  createPost,
  postDetail,
  updatePost,
  deletePost,
  commentPost,
  getAllPost,
  toggle_like,
} = require("../controllers/postController");
const { auth, authEdit } = require("../middleware/auth");

const router = require("express").Router();

router.post("/create", auth, createPost);

// router.get("/all", getAllPost);

router
  .route("/:id")
  .get(auth, postDetail)
  .put(auth, authEdit, updatePost)
  .delete(auth, authEdit, deletePost);

router.post("/:post_id/comment", auth, commentPost);

router.post("/:post_id/like", auth, toggle_like);
module.exports = router;
