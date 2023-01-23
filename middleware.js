


// module.exports.isLoggedIn= (req,res,next)=>{
//     if(!req.isAuthenticated()){
//         req.flash('error','first you must be signed in')
//         return res.redirect('/login')
//       }
//       next();
// }

///import it to campgrounds.js in routes dir 


///change made in current User helper lec.

// module.exports.isLoggedIn= (req,res,next)=>{
//    ///console.log('Req User....',req.user);
//   if(!req.isAuthenticated()){
//       req.flash('error','first you must be signed in')
//       return res.redirect('/login')
//     }
//     next();
// }


///changes made in return to behaviour lec (last lec)

const {campgroundSchema,reviewSchema}=require('./schemas.js');
const ExpressError=require('./utils/ExpressError')//these 3 added in authorization middleware lec part 52
const Campground=require('./Model/campground');
const Review = require('./Model/review.js');//don not change const review spellings

module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
     /// req.session.returnTo = req.originalUrl
      req.flash('error', 'You must be signed in first!');
      return res.redirect('/login');
  }
  next();
}


///added in authorization middleware lec, part 52

module.exports.validateCampground=(req,res,next)=>{//1
  
  const {error}=campgroundSchema.validate(req.body);
  if(error){
    const msg =error.details.map(el=>el.message).join(',')
    throw new ExpressError(msg,400)
  }else{
    next();
  }
  }
  
module.exports.isAuthor=async(req,res,next)=>{//1
const {id}= req.params;
const campground =await Campground.findById(id);
if(!campground.author.equals(req.user._id)){
  req.flash('error','you dont have permission for that')
  return res.redirect(`/campgrounds/${id}`)
}
next();
}

//* added in last lec adding more reviews auth , part 52
//cont views name kept by self do not change   

module.exports.isReviewAuthor = async (req, res, next) => {
  const { id, reviewId } = req.params;
  const review = await Review.findById(reviewId);
  if (!review.author.equals(req.user._id)) {
      req.flash('error', 'You do not have permission to do that!');
      return res.redirect(`/campgrounds/${id}`);
  }
  next();
}


    


//2
module.exports.validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);
  if (error) {
      const msg = error.details.map(el => el.message).join(',')
      throw new ExpressError(msg, 400)
  } else {
      next();
  }
}