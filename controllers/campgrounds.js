const Campground= require('../Model/campground');

const mbxGeocoding=require('@mapbox/mapbox-sdk/services/geocoding')
const mapBoxToken= process.env.MAPBOX_TOKEN;
const geocoder=mbxGeocoding({accessToken:mapBoxToken})

const cloudinary = require("cloudinary");
//added const img, push and await campground @pt54


module.exports.index=async(req,res)=>{
    const campgrounds= await Campground.find({});
    res.render('campgrounds/index.ejs',{campgrounds})
}


module.exports.renderNewForm=(req,res)=>{
    res.render('campgrounds/new.ejs')
    }


 module.exports.createCampground=async(req,res,next)=>{
 const geoData= await geocoder.forwardGeocode({
  query:req.body.campground.location,
  limit:1
 }).send()
const campground=  new Campground(req.body.campground);
campground.geometry=geoData.body.features[0].geometry;
campground.images = req.files.map(f => ({ url: f.path, filename: f.filename }));
campground.author=req.user._id 
await campground.save()
console.log(campground)
req.flash('success','successfully created a new campground !')//made in setting up flash lec
res.redirect(`/campgrounds/${campground._id}`) 
    }


    module.exports.showCampground= async(req,res)=>{      
        const campground= await Campground.findById(req.params.id).populate(
          {path:'reviews',
          populate:{
            path:'author'
          }
        }).populate('author');//changed in more reviews auth @ adding auth to campground lec, part 52
        if(!campground){
          req.flash('error','campground not found !')
          return res.redirect('/campgrounds')//added in flash error  partial lec
        }
        res.render('campgrounds/show.ejs',{campground})
      }

     module.exports.renderEditForm= async(req,res)=>{
        const{id}=req.params;
        const campground= await Campground.findById(id)
        if(!campground){
          req.flash('error','campground not found !')
          return res.redirect('/campgrounds')//added in flash error  partial lec
        }
        res.render('campgrounds/edit.ejs',{campground})
      }

   module.exports.updateCampground= async (req, res) => {
        const { id } = req.params;
        console.log(req.body)/// added in deleting images form lec @pt54
        const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground });
        const imgs=  req.files.map(f => ({ url: f.path, filename: f.filename }));
        campground.images.push(...imgs);
        await campground.save()
        if (req.body.deleteImages) {
          for(let filename of req.body.deleteImages){
            await cloudinary.uploader.destroy(filename);//2* removing images on cloudinary
          }
          //1*
          await campground.updateOne({ $pull: { images: { filename: { $in: req.body.deleteImages } } } })
      }
        req.flash('success','successfully updated a new campground !')
        res.redirect(`/campgrounds/${campground._id}`)
      }
//added const img, push and await campground.save in adding upload to
//a edit page lec @pt54. added img so the new images added to camp
// should not override exixting images but to add them 


//**added if in adding upload to Deleting Images Backend Lec @pt54
//its for deleting images in mongo(campground)/// then add destry
// to removes images from cloudinary



      module.exports.deletecampground=async (req, res) => {
        const { id } = req.params;
        await Campground.findByIdAndDelete(id);
        req.flash('success','successfully deleted a campground !')// added in flash success partial  lec
        res.redirect('/campgrounds');
      }