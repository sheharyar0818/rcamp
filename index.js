

if(process.env.NODE_ENV !== "production"){
  require('dotenv').config();
} 
//require('dotenv').config();

const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const ejsMate= require('ejs-mate');
const session = require('express-session')
const flash= require('connect-flash')
const Joi= require('joi');
//const {campgroundSchema,reviewSchema}=require('./schemas.js')//we use {} destructure because we might be exporting more schemas
const ExpressError=require('./utils/ExpressError')
// const Campground= require('./Model/campground');
// const Review=require('./Model/review')cut campsch,camp,review to review.js
const methodOverride = require('method-override');
const passport= require('passport');
const LocalStrategy= require('passport-local')
const User= require('./Model/user')
const mongoSanitize = require('express-mongo-sanitize');
const helmet= require('helmet')

const userRoutes=require('./routes/users');
const campgroundRoutes= require('./routes/campground')
const reviewRoutes= require('./routes/review');



const  MongoDBStore = require('connect-mongo')(session);

const dbUrl= process.env.DB_URL || 'mongodb://localhost:27017/rCamp';

mongoose.connect(dbUrl)


 app.set('views', path.join(__dirname, 'views'));
 app.engine('ejs',ejsMate)
 app.set('view engine', 'ejs');
 app.use(express.urlencoded({extended:true}))
 app.use(methodOverride('_method'));

app.use(express.static(path.join(__dirname,'public')))

app.use(mongoSanitize({}),);

const secret= process.env.SECRET || 'thisisok'; 

const store = new MongoDBStore({
  url:dbUrl,
  secret,
  touchAfter: 24*60*60
});

store.on("error",function(e){
  console.log("session store error",e)
})

const sessionConfig={
  store,
  name:'session',
  secret,
  resave:false,
  saveUninitialized:true,
  cookie:{
    httpOnly:true,
    //secure:true,
    expires:Date.now()+1000*60*60*24*7,
    maxAge:1000*60*60*24*7
  }
}



app.use(session(sessionConfig))
app.use(flash());

app.use(helmet());



const scriptSrcUrls = [
    "https://https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/js/bootstrap.bundle.min.js/",
    "https://api.mapbox.com/mapbox-gl-js/v2.12.0/mapbox-gl.js",
    "https://api.tiles.mapbox.com/",
    "https://api.mapbox.com/",
    "https://kit.fontawesome.com/",
    "https://cdnjs.cloudflare.com/",
    "https://https://cdn.jsdelivr.net/npm/bs-custom-file-input/dist/bs-custom-file-input.min.js",
];
const styleSrcUrls = [
    "https://kit-free.fontawesome.com/",
    "https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css",
    "https://api.mapbox.com/mapbox-gl-js/v2.12.0/mapbox-gl.css",
    "https://api.mapbox.com/",
    "https://api.tiles.mapbox.com/",
    "https://fonts.googleapis.com/",
    "https://use.fontawesome.com/",
];
const connectSrcUrls = [
    "https://api.mapbox.com/",
    "https://a.tiles.mapbox.com/",
    "https://b.tiles.mapbox.com/",
    "https://events.mapbox.com/",
];
const fontSrcUrls = [];
app.use(
    helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: [],
            connectSrc: ["'self'", ...connectSrcUrls],
            scriptSrc: ["'unsafe-inline'", "'self'", ...scriptSrcUrls],
            styleSrc: ["'self'", "'unsafe-inline'", ...styleSrcUrls],
            workerSrc: ["'self'", "blob:"],
            objectSrc: [],
            imgSrc: [
                "'self'",
                "blob:",
                "data:",
                "https://res.cloudinary.com/dtrvlno4h/",, //SHOULD MATCH YOUR CLOUDINARY ACCOUNT! 
                "https://images.unsplash.com/",
            ],
            fontSrc: ["'self'", ...fontSrcUrls],
        },
    })
);

app.use(passport.initialize());//if we need persistent log in sessions 
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));


passport.serializeUser(User.serializeUser());//storing a user in session
passport.deserializeUser(User.deserializeUser());//removing a user in session


 const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error:"));
  db.once("open", () => {
      console.log("Database connected");
  });




app.use((req,res,next)=>{
 // console.log(req.session)
  res.locals.currentUser=req.user;
  res.locals.success=req.flash('success');
  res.locals.error=req.flash('error');
  next()
})


app.use('/',userRoutes)
app.use('/campgrounds',campgroundRoutes)
app.use('/campgrounds/:id/reviews',reviewRoutes)



  app.get('/',(req,res)=>{
    res.render('home.ejs')
  })


//app.all is for every type of request. * is for every path.

app.all('*',(req,res,next)=>{
 next(new ExpressError('Page not found',404))
})


 
 app.use((err,req,res,next)=>{
  const{statusCode=500}=err;
  if(!err.message)err.message='ok something is wrong !'
  res.status(statusCode).render('error',{err})
 })
 //for printing message and error stack
// ///http://localhost:5000/campgrounds62f1297060bc626c840edad8



const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Serving on port ${port}`)
})
