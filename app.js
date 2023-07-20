const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const postsRouter = require('./routes/post');

// require('./connections/index')
const app = express();
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/posts', postsRouter);

app.use((req,res)=>{
  res.status(404).json({
    status:false,
    message:'沒有此路徑'
  })
})
app.use((err,req,res)=>{
  res.status(500).json({
    status:false,
    message:'頁面錯誤'
  })
})
module.exports = app;
