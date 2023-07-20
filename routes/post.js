const express = require('express');
const router = express.Router();
const postsControllers = require('../controllers/postControllers');
const multer  = require('multer');
const upload = multer();
/* GET home page. */
router.get('/', function(req, res) {
  postsControllers.getPostsData(res)
});
router.post('/',upload.any() ,(req,res)=>{
  postsControllers.addPostsData(req,res);
})

// router.delete('/:id',(req,res)=>{
//   postsControllers.deleteIDPostData(req,res)
// })
// router.delete('/',(req,res)=>{
//   postsControllers.deleteAllPostData(req,res)
// })
// router.patch('/:id',(req,res)=>{
//   const id =req.params.id ;
//   postsControllers.patchPostsData(req,res,id)
// })
module.exports = router;
