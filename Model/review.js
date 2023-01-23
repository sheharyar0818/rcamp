const mongoose = require('mongoose');
const Schema= mongoose.Schema


const reviewSchema= new Schema({
    body:String,
    rating:Number,
    author:{
        type:Schema.Types.ObjectId,
        ref:"User"  //added in adding auth to campground lec, part 52
       }
});

module.exports=mongoose.model('Review',reviewSchema);