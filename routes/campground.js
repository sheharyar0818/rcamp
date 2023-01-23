const express = require('express')
const router = express.Router();

const catchAsync=require('../utils/catchAsync');
const {campgroundSchema,reviewSchema}=require('../schemas.js');
const ExpressError=require('../utils/ExpressError')
const Campground= require('../Model/campground');

const{isLoggedIn,isAuthor,validateCampground}= require('../middleware')//changed in authorization middleware lec,part52

//added in multlier middleware  lec , part 54
const multer  = require('multer')

//const upload = multer({ dest: 'uploads/' })

//added in uploading to cloudinary  lec , part 54
const{storage} = require('../cloudinary/index')

const upload = multer({storage })

const campgrounds= require('../controllers/campgrounds')///added in refactoring campground lec , part 53
////////////////////////////////////////////////////////////////////////

  /// changed in  fancy way to refactoring lec , part 53/////////



//router.get('/new',isLoggedIn,campgrounds.renderNewForm)

//1//router.post('/',isLoggedIn , validateCampground,catchAsync( campgrounds.createCampground))

//1/router.get('/',  catchAsync(campgrounds.index));

//2router.get('/:id' ,catchAsync(campgrounds.showCampground))

//router.get('/:id/edit',isLoggedIn, isAuthor ,catchAsync(campgrounds.renderEditForm))

//2 router.put('/:id', isLoggedIn ,isAuthor,validateCampground, catchAsync(campgrounds.updateCampground));

//2 router.delete('/:id',isLoggedIn , isAuthor ,catchAsync(campgrounds.deletecampground))


router.route('/')
.get( catchAsync(campgrounds.index))
.post(isLoggedIn,upload.array('image'),validateCampground,catchAsync( campgrounds.createCampground))

//reused  above post in uploading images to mango lec part 54

//changed in multlier middleware  lec , part 54

//1
// .post((req,res)=>{
//   res.send(req.body)
// })

//2
// .post(upload.single('image'),async(req,res)=>{
//   console.log(req.body , req.file)
//   res.send('it worked')
// })

// .post(upload.single('image'),async(req,res)=>{
//   console.log(req.body , req.file)
//   return res.json({ image: req.file.path });
// })//checked in basic cloudinary upload lec, lookup on web
/// used for uploading  to cloudinary basics


//3
// .post(upload.array('image'),  (req,res)=>{
//   console.log(req.body , req.files)
//   res.send('it worked')
// })


router.get('/new',isLoggedIn,campgrounds.renderNewForm)



router.route('/:id')
.get(catchAsync(campgrounds.showCampground))
.put(isLoggedIn , upload.array('image'),isAuthor,validateCampground, catchAsync(campgrounds.updateCampground))
.delete(isLoggedIn , isAuthor ,catchAsync(campgrounds.deletecampground))
//added uplaod.array in put @ adding upload to edit page lec @ pt 54

router.get('/:id/edit',isLoggedIn, isAuthor ,catchAsync(campgrounds.renderEditForm))


  module.exports=router;


//////////////////////////////////////////////////////////////////////

//see previous version @ part 52, in case of any difficulties, controllers
//had been added below added in part 53.

// // router.get('/new',(req,res)=>{
// //   if(!req.isAuthenticated()){
// //     req.flash('error','you must be signed in')
// //     return res.redirect('/login')
// //   }
// //   res.render('campgrounds/new.ejs')
// //   })
  
// ////changed in isloogedin lec,part51 and added isLoggedIn middleware
// // router.get('/new',isLoggedIn,(req,res)=>{
// //   res.render('campgrounds/new.ejs')
// //   })

// ///2 , changed in refactoring campgrounds lec , part 53 //////////////
// router.get('/new',isLoggedIn,campgrounds.renderNewForm)


  
//   // router.post('/',isLoggedIn , validateCampground,catchAsync( async(req,res,next)=>{
//   // const campground=  new Campground(req.body.campground);
//   // campground.author=req.user._id //added author @ adding auth to campground lec, part 52
//   // await campground.save()
//   // req.flash('success','successfully created a new campground !')//made in setting up flash lec
//   // res.redirect(`/campgrounds/${campground._id}`)
    
//   // }))

// ///3 , changed in refactoring campgrounds lec , part 53 //////////////

//   router.post('/',isLoggedIn , validateCampground,catchAsync( campgrounds.createCampground))




  
//   //  router.get('/',  catchAsync(async(req,res)=>{
//   //      const campgrounds= await Campground.find({});
//   //      res.render('campgrounds/index.ejs',{campgrounds})
//   //  }))

//   ///1 , changed in refactoring campgrounds lec , part 53/////////
//   router.get('/',  catchAsync(campgrounds.index));

  



//   // router.get('/:id' ,catchAsync(async(req,res)=>{
//   //   // const campground= await Campground.findById(req.params.id).populate('reviews').populate('author');//added author @ adding auth to campground lec, part 52
//   //  //console.log(campgorund)
   
//   //   const campground= await Campground.findById(req.params.id).populate(
//   //     {path:'reviews',
//   //     populate:{
//   //       path:'author'
//   //     }
//   //   }).populate('author');//changed in more reviews auth @ adding auth to campground lec, part 52
//   //   console.log(campground)
//   //   if(!campground){
//   //     req.flash('error','campground not found !')
//   //     return res.redirect('/campgrounds')//added in flash error  partial lec
//   //   }
//   //   res.render('campgrounds/show.ejs',{campground})
//   // }))
// //added (if) , in a condition when the campground looked up doesnt exist
// //or its deleted it will show the req.flash message if it exists then
// // it will not show the message.
//   ///add loop in show.ejs before running this function.

  
// ///4 , changed in refactoring campgrounds lec , part 53 //////////////

// router.get('/:id' ,catchAsync(campgrounds.showCampground))



//   // router.get('/:id/edit',isLoggedIn ,catchAsync(async(req,res)=>{
//   //   const campground= await Campground.findById(req.params.id)
//   //   if(!campground){
//   //     req.flash('error','campground not found !')
//   //     return res.redirect('/campgrounds')//added in flash error  partial lec
//   //   }
//   //   res.render('campgrounds/edit.ejs',{campground})
//   // }))


// //changed  @ campground permissions lec (2), part 52
//   // router.get('/:id/edit',isLoggedIn ,catchAsync(async(req,res)=>{
//   //   const{id}=req.params;
//   //   const campground= await Campground.findById(id)
//   //   if(!campground){
//   //     req.flash('error','campground not found !')
//   //     return res.redirect('/campgrounds')//added in flash error  partial lec
//   //   }
//   //   if(!campground.author.equals(req.user._id)){
//   //     req.flash('error','you dont have permission for that')
//   //     return res.redirect(`/campgrounds/${id}`)
//   // }
//   //   res.render('campgrounds/edit.ejs',{campground})
//   // }))
   
// ///  //changed in authorization middleware lec

// // router.get('/:id/edit',isLoggedIn, isAuthor ,catchAsync(async(req,res)=>{
// //   const{id}=req.params;
// //   const campground= await Campground.findById(id)
// //   if(!campground){
// //     req.flash('error','campground not found !')
// //     return res.redirect('/campgrounds')//added in flash error  partial lec
// //   }
// //   res.render('campgrounds/edit.ejs',{campground})
// // }))

// ///5 , changed in refactoring campgrounds lec , part 53 //////////////

// router.get('/:id/edit',isLoggedIn, isAuthor ,catchAsync(campgrounds.renderEditForm))



  
  
//   // router.put('/:id', isLoggedIn ,validateCampground, catchAsync(async (req, res) => {//2
//   //   const { id } = req.params;
//   //   const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground });
//   //   req.flash('success','successfully updated a new campground !')// added in flash success partial  lec
//   //   res.redirect(`/campgrounds/${campground._id}`)
//   // }));
  
//  //changed  @ campground permissions lec (1) , part 52

//   // router.put('/:id', isLoggedIn ,validateCampground, catchAsync(async (req, res) => {//2
//   //   const { id } = req.params;
//   //   const campground =await Campground.findById(id);
//   //   if(!campground.author.equals(req.user._id)){
//   //     req.flash('error','you dont have permission for that')
//   //     return res.redirect(`/campgrounds/${id}`)
//   // }
//   //   const camp = await Campground.findByIdAndUpdate(id, { ...req.body.campground });
//   //   req.flash('success','successfully updated a new campground !')
//   //   res.redirect(`/campgrounds/${campground._id}`)
//   // }));
 

//   //changed in authorization middleware lec @part 52
//   // router.put('/:id', isLoggedIn ,isAuthor,validateCampground, catchAsync(async (req, res) => {//2
//   //   const { id } = req.params;
//   //   const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground });
//   //   req.flash('success','successfully updated a new campground !')
//   //   res.redirect(`/campgrounds/${campground._id}`)
//   // }));
 
// ///6 , changed in refactoring campgrounds lec , part 53 //////////////
// router.put('/:id', isLoggedIn ,isAuthor,validateCampground, catchAsync(campgrounds.updateCampground));


//   // router.delete('/:id',isLoggedIn , isAuthor ,catchAsync(async (req, res) => {
//   //   const { id } = req.params;
//   //   await Campground.findByIdAndDelete(id);
//   //   req.flash('success','successfully deleted a campground !')// added in flash success partial  lec
//   //   res.redirect('/campgrounds');
//   // }))

//   ///7 , changed in refactoring campgrounds lec , part 53 //////////////
//   router.delete('/:id',isLoggedIn , isAuthor ,catchAsync(campgrounds.deletecampground))

  

 // module.exports=router;