const {Schema,model} = require('mongoose');




const schema = Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    imageFileSet:{
        type:String,
        required:true
    },
    publishedAt:{
        type:Date,
        default:Date.now()
    },
})

module.exports = model("posts",schema);
