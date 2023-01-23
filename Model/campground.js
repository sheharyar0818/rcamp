const mongoose = require('mongoose');
//const Review= require('./review') it shows error, part 46 last lec
const Schema= mongoose.Schema

const opts = { toJSON: { virtuals: true } };

const ImageSchema= new Schema({
  url:String,
  filename:String
})

ImageSchema.virtual('thumbnail').get(function () {
  return this.url.replace('/upload', '/upload/w_200');
});
////https://res.cloudinary.com/dguairknb/image/upload/w_300/v1670340002/Ucamp/l5dboeacgdleaptbggg0.jpg

//added imageSchema in storing Adding a thumbnail virutal property lec on mongo part 54

const CampgroundSchema = new Schema({
    title: String,
    images:[ImageSchema],
    price: Number,
    description: String,
    geometry: {
       type: {
         type: String, 
         enum: ['Point'], 
         required: true
       },
       coordinates: {
         type: [Number],
         required: true
       } 
     },
    author:{
     type:Schema.Types.ObjectId,
     ref:"User"  //added in adding auth to campground lec, part 52
    },
    reviews:[
      {
        type:Schema.Types.ObjectId,
        ref:'Review'

      }


    ]
},opts); 

CampgroundSchema.virtual('properties.popUpMarkup').get(function () {
  return `<strong><a href="/campgrounds/${this._id}">${this.title}</a><strong>
     <p> ${this.description.substring(0,20)}... </p>      `;
});


module.exports= mongoose.model('Campground',CampgroundSchema);

///its a One to Many relationship, in which we will connect reviews
// to a campground.

//And we will embed an array of object Id's in each campground.



////included in Campground delete  Middleware lec

// CampgroundSchema.post('findOneAndDelete',async function() {
//   console.log('deleted!')
// })


// CampgroundSchema.post('findOneAndDelete',async function(doc) {
//   console.log(doc)
// })



CampgroundSchema.post('findOneAndDelete', async function (doc) {
  if (doc) {
      await Review.deleteMany({
          _id: {
              $in: doc.reviews
          }
      })
  }
})
///middleware is not working, however campground is being deleted but
/// reviews are not getting deleted.