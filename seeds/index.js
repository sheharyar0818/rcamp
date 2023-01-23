const mongoose = require('mongoose');
const cities = require('./cities')
const {places ,descriptors}= require('./seedHelpers');
const Campgorund= require('../Model/campground');


mongoose.connect('mongodb://localhost:27017/rCamp')

 

 const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error:"));
  db.once("open", () => {
      console.log("Database connected");
  });

//1
//   const seedDB= async()=>{
//     await Campgorund.deleteMany({})
//     const c= Campgorund({title:'green fileds'})
//     await c.save()
//   }

//2

// const seedDB= async()=>{
//     await Campgorund.deleteMany({});
//     for(let i=0; i<50; i++){
//         const random1000= Math.floor(Math.random()*1000);
//         const camp= new Campgorund({
//             location:`${cities[random1000].city},${cities[random1000].state}`
//         })
//         await camp.save()
//     }
    
//   }


//   seedDB();

  //3

  const sample= array=>array[Math.floor(Math.random()*array.length)]
  ///the above function is for finding a random element in an array.


  const seedDB= async()=>{
    await Campgorund.deleteMany({});
    for(let i=0; i<300; i++){
        const random1000= Math.floor(Math.random()*1000);
        const price= Math.floor(Math.random()*20)+10;
        const camp= new Campgorund({
            author:'6395d4817d55bde29ebb23a8',///added in adding auth to campground lec, part 52
            location:`${cities[random1000].city},${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
              //commented out in fixing our seeds lec @part 54
            //image:'https://source.unsplash.com/collection/484351',
            description:'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quisquam cumque vero repellendus necessitatibus inventore eveniet animi, non dolore, expedita vel exercitationem? Minima, minus? Odit dignissimos autem voluptate magnam a facere.',
            price,
            //added gemotry in fixing our seeds lec @part 54
           //changed gemometry in re-seeding our database again lec @pt56
            geometry : { 
              "type" : "Point", 
              coordinates : [  
              cities[random1000].longitude ,
              cities[random1000].latitude,    
          ]
        }  
          , 

            images:[
              {
                url: 'https://res.cloudinary.com/dtrvlno4h/image/upload/v1671340023/Rcamp/bbbkkymg05iqjyr3nosw.jpg',
                filename: 'Rcamp/bbbkkymg05iqjyr3nosw',
              },
              {
                url: 'https://res.cloudinary.com/dtrvlno4h/image/upload/v1671339592/Rcamp/jvndlpnqqapyjnvnap1y.jpg',
                filename: 'Rcamp/jvndlpnqqapyjnvnap1y',
              }
            ] 
        })
        await camp.save()
    }
    
  }

  seedDB().then(()=>{
    mongoose.connection.close();
  });