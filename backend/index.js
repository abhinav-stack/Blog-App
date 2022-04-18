const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const PostRoutes = require('./routes/PostRoutes.js');

const PORT=8001

const app = express();

app.use(cors());
app.use(bodyParser.json({
  limit: '50mb'
}));

app.use(bodyParser.urlencoded({
  limit: '50mb',
  parameterLimit: 100000,
  extended: true 
}));



app.use("/posts",PostRoutes);



const URL= "mongodb://admin:admin123@mernstackapp-shard-00-00.svmf9.mongodb.net:27017,mernstackapp-shard-00-01.svmf9.mongodb.net:27017,mernstackapp-shard-00-02.svmf9.mongodb.net:27017/reactBlogApp?ssl=true&replicaSet=atlas-4s6627-shard-0&authSource=admin&retryWrites=true&w=majority"

mongoose.connect(URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(()=>{
    app.listen(PORT,()=>{
    console.log("app is up and running on port 8001");
})

})
.catch((e)=>{
    console.log("error",e.message);
})
