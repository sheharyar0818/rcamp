const express = require('express')
const router = express.Router({mergeParams:true});//add merge in last, breaking out reviews lec
//we used mergeParams because, express router keeps the Params separate
/// so we use mergeParams than we will have access to params(the :id/reviews) 

//const {validateReview,isLoggedIn}= require('../middleware')//added part 52 authorization middleware lec
//added islogged in , in review permission lec, part52)

const {validateReview,isLoggedIn,isReviewAuthor}= require('../middleware')

//* added isreviewauthor last lec adding more reviews auth , part 52


const Campground= require('../Model/campground');
const Review=require('../Model/review')

const reviews = require('../controllers/reviews') ///added in review controls lec , part 53 //////////////


const {reviewSchema}=require('../schemas.js')


const ExpressError=require('../utils/ExpressError')
const catchAsync=require('../utils/catchAsync');


// const validateReview = (req, res, next) => {
//     const { error } = reviewSchema.validate(req.body);
//     if (error) {
//         const msg = error.details.map(el => el.message).join(',')
//         throw new ExpressError(msg, 400)
//     } else {
//         next();
//     }
//   }//// transfered to middleware.js in part 52 lec authorization middleware


// router.post('/',isLoggedIn,validateReview,catchAsync(async(req,res)=>{
//     const campground= await Campground.findById(req.params.id)
//     const review = new Review(req.body.review);
//     review.author=req.user._id;/// added in reviews permission lec part52
//     campground.reviews.push(review);
//     await review.save();
//     await campground.save();
//     req.flash('success','successfully created a new review !')//flash success partial  lec
//     res.redirect(`/campgrounds/${campground._id}`);
//   }))

///1 , changed in adding review controls lec , part 53 //////////////

router.post('/',isLoggedIn,validateReview,catchAsync(reviews.createReview))





  
  //the route will delete the id of review and review itself made
  ///for the particular campground. the single review
  
  // app.delete('/campgrounds/:id/reviews/:reviewId',catchAsync(async(req,res)=>{
  //   res.send('delete it')
  // }))//comment out
  ///add delete in show.ejs
  
  
  // used the Pull operator form mongodb, read docs.
  
  //The pull operator removes from an existing array 
  //all instances of a value or values that match a specified condition.
  
  
  //added isloggedin @more reviews auth @ adding auth to campground lec, part 52

  // router.delete('/:reviewId',isLoggedIn,isReviewAuthor,catchAsync(async(req,res)=>{
  //   const{id,reviewId}=req.params;
  //   await Campground.findByIdAndUpdate(id,{$pull:{reviews:reviewId}})
  //   await Review.findByIdAndDelete(reviewId);
  //   req.flash('success','successfully deleted a  review !')//flash success partial  lec
  //   res.redirect(`/campgrounds/${id}`);
  // }))

 ///2 , changed in adding review controls lec , part 53 //////////////
 
 router.delete('/:reviewId',isLoggedIn,isReviewAuthor,catchAsync(reviews.deleteReview))


  module.exports=router;