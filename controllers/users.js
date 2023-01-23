const User= require('../Model/user');

//1

module.exports.renderRegister= (req,res)=>{
    res.render('users/register');
}


//2

module.exports.register= async(req,res)=>{
    try{
    const{email,password,username}=req.body;
    const user= new User({email,username});
    const registeredUser= await User.register(user,password);
    req.login(registeredUser,err=>{
        if(err) return next(err);
        req.flash('success','welcome to Ucamp !');
        res.redirect('/campgrounds');
    })
    
    }catch(e){
        req.flash('error',e.message);
        res.redirect('register');
    }

 }


 //3

 module.exports.renderLogin= (req,res)=>{
    res.render('users/login')
}

//4

module.exports.login=(req, res) => {
    req.flash('success', 'welcome back!');
    const redirectUrl = req.session.returnTo || '/campgrounds';
    delete req.session.returnTo;
    res.redirect(redirectUrl);
}


//5


module.exports.logout=function(req, res, next){
    req.logout(function(err) {
      if (err) { return next(err); }
      req.flash('success', "Goodbye!");
      res.redirect('/campgrounds');
    });
  }