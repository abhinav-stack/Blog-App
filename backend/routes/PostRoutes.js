const express = require('express');
const { GetAllPosts,GetPostDetailsById,DeletePostById,UpdatePostDetailsById,AppPost,searchBlogPost } = require('../controller/PostController');



const router = express.Router();


//declaring route

router.get("/",GetAllPosts);
router.get("/:id",GetPostDetailsById);
router.delete("/:id",DeletePostById);
router.put("/:id",UpdatePostDetailsById);
router.post("/",AppPost);
router.post("/search",searchBlogPost);


module.exports = router;

