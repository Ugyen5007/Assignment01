
let atlasDB = "mongodb+srv://dbadmin:lSNmLzUCtumF4K9g@cluster0.vm2gmkd.mongodb.net/products"



// Database setup

const { default : mongoose } = require('mongoose');

 
module.exports = function(){


    mongoose.connect(atlasDB);

 

    let mongodb = mongoose.connection;

 

    mongodb.on('error', console.error.bind(console, 'Connection Error: '));

    mongodb.once('open', ()=>{

        console.log("====> Connected to MongoDB.");

    })

 

    return mongodb;

 

}

//module.exports = {"URI":"mongodb://localhost:3000//Products"}
