const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blogController");
const auth = require("../middleware/auth");
const role = require("../middleware/role");

// Any logged-in user can view posts
router.get("/", auth, blogController.getPosts);

// Only admin can create, update, delete
router.post("/", auth, role("admin"), blogController.createPost);
router.put("/:id", auth, role("admin"), blogController.updatePost);
router.delete("/:id", auth, role("admin"), blogController.deletePost);

module.exports = router;
