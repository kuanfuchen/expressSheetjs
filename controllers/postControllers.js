const handleSuccess = require('../services/handlesuccess');
const handleError = require('../services/handleError');
// const Post = require('../models/postsmodel');
const xlsxWork = require('../services/xlsx');

const postsControllers = {
  getPostsData: async(res) => {
    // const data = await Post.find();
    handleSuccess(res,'success')
    // handleSuccess(res,data);
  },
  addPostsData: async(req,res)=>{
    try{
      
      // const files = req.files;
      // for(let i = 0 ; files.length > i ; i++){
      //   if(i===0){
      //     const xlsxData = await xlsxWork(files[i]);
      //     await handleSuccess(res, xlsxData);
      //   }
      // }
      const file = req.files[0];
      const xlsxData = await xlsxWork(file);
      await handleSuccess(res, xlsxData);
    }catch(err){
      // console.log(err, 'create err')
      handleError(res,'很抱歉，格式錯誤了')
    }
  },
}
module.exports = postsControllers;