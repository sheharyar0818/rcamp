const Campground= require('../Model/campground');
const Review=require('../Model/review')


//1
module.exports.createReview= async(req,res)=>{
    const campground= await Campground.findById(req.params.id)
    const review = new Review(req.body.review);
    review.author=req.user._id;/// added in reviews permission lec part52
    campground.reviews.push(review);
    await review.save();
    await campground.save();
    req.flash('success','successfully created a new review !')//flash success partial  lec
    res.redirect(`/campgrounds/${campground._id}`);
  }


  //2
  module.exports.deleteReview= async(req,res)=>{
    const{id,reviewId}=req.params;
    await Campground.findByIdAndUpdate(id,{$pull:{reviews:reviewId}})
    await Review.findByIdAndDelete(reviewId);
    req.flash('success','successfully deleted a  review !')//flash success partial  lec
    res.redirect(`/campgrounds/${id}`);
  }


  