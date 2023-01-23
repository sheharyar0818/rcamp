const express= require('express')
const router= express.Router();
const passport=require('passport')//** 2/
const catchAsync=require('../utils/catchAsync')//*2
const User= require('../Model/user');

const users= require('../controllers/users'); //added in review controls lec , part 53 //////////////
const review = require('../Model/review');
const user = require('../Model/user');

////////////////////////////////////////////////////////////////////

  /// changed in  fancy way to refactoring lec , part 53/////////

//1
router.route('/register')
.get((users.renderRegister))
.post(catchAsync(users.register))

//2
router.route('/login')
.get((users.renderLogin))
.post( passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), users.login)


// router.get('/register',(users.renderRegister)) 1

// router.post('/register',catchAsync(users.register ))1

// router.get('/login',(users.renderLogin))2

//2 router.post('/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), users.login)

router.get('/logout', (users.logout))///from passport docs


module.exports=router;



///////////////////////////////////////////////////////////////////////

//see previous version @ part 52, in case of any difficulties, controllers
//had been added below added in part 53.


// router.get('/register',(req,res)=>{
//     res.render('users/register');
// })
 ///1 , changed in adding review controls lec , part 53 //////////////

 //router.get('/register',(users.renderRegister))



//after making register form

// router.post('/register',(req,res)=>{
//     res.send(req.body)
// })
///////////////////////////////////////////////////////

//made in Register Logic lec *

//1
// router.post('/register',async(req,res)=>{
//     const{email,password,username}=req.body;
//     const user= new User({email,username});
//     const registeredUser= await User.register(user,password);
//     console.log(registeredUser);
//     req.flash('success','welcome to Ucamp !');
//     res.redirect('/campgrounds');

// })

//2

// router.post('/register',catchAsync(async(req,res)=>{
//     const{email,password,username}=req.body;
//     const user= new User({email,username});
//     const registeredUser= await User.register(user,password);
//     console.log(registeredUser);
//     req.flash('success','welcome to Ucamp !');
//     res.redirect('/campgrounds');

// }));


//3

// router.post('/register',catchAsync(async(req,res)=>{
//     try{
//     const {email,username,password}=req.body;
//     const user= new User({email,username});
//     const registeredUser= await User.register(user,password);
//     console.log(registeredUser)
//     req.flash('success','welcome to Acamp !')
//     res.redirect('/campgrounds')}
//     catch(e){
//         req.flash('error',e.message)
//         res.redirect('register')
//     }
// }));




// router.post('/register',catchAsync(async(req,res)=>{
//     try{
//     const{email,password,username}=req.body;
//     const user= new User({email,username});
//     const registeredUser= await User.register(user,password);
//     req.login(registeredUser,err=>{
//         if(err) return next(err);
//         req.flash('success','welcome to Ucamp !');
//         res.redirect('/campgrounds');
//     })
    
//     }catch(e){
//         req.flash('error',e.message);
//         res.redirect('register');
//     }
/////added if err in fixing regester route lec

//}));

 ///2 , changed in adding review controls lec , part 53 //////////////
/// router.post('/register',catchAsync(users.register))





//////////////////////////////////////////////////////////////////////


//made in  login routes  lec **

///make login.ejs in users dir in views dir

// router.get('/login',(req,res)=>{//1
//     res.render('users/login')
// })

 ///3 , changed in adding review controls lec , part 53 //////////////
 //router.get('/login',(users.renderLogin))




//2

// router.post('/login',passport.authenticate('local',{failureFlash:true,failureRedirect:'/login'}),(req,res)=>{
//   req.flash('success','welcome back')
//   res.redirect('/campgrounds')
// })


  
// router.post('/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), (req, res) => {
//     req.flash('success', 'welcome back!');
//     const redirectUrl = req.session.returnTo || '/campgrounds';
//     delete req.session.returnTo;
//     res.redirect(redirectUrl);
// })//used this one untill  adding reviews controls lec , part53 

// router.post('/login', passport.authenticate('local',{failureFlash:true, failureRedirect:'/login'}), (req,res)=>{
//     req.flash('success','welcome back');
//     const redirectUrl= req.session.returnTo || '/campgrounds';
//     res.redirect('redirectUrl')
// })
///this function not working properly, the page is not being redirected
//to the original page requested before login (not being 
//redirected back to new campground/edit campground etc)


 ///4 , changed in adding review controls lec , part 53 //////////////
//router.post('/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), users.login)



///////////////////////////////////////////////////////////////////

//added in Addding logout lec

// router.get('/logout', (req, res)=> {
//         req.logout();
//         req.flash('success', "Goodbye!");
//         res.redirect('/campgrounds');
//     })


    // router.get('/logout', function(req, res, next){
    //     req.logout(function(err) {
    //       if (err) { return next(err); }
    //       req.flash('success', "Goodbye!");
    //       res.redirect('/campgrounds');
    //     });
    //   });//took from docs

 ///5 , changed in adding review controls lec , part 53 //////////////

 //router.get('/logout', (users.logout));//took from docs



//module.exports=router;