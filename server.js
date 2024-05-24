const express=require('express');
const app=express();
const port=process.env.PORT || 8080;
const mongodb=require('./schema.js');

app.get('/',(req,res)=>{
    res.send('Hello World'+process.env.name);
});


mongodb.connect().then(()=>app.listen(port,()=>{
    console.log('Server is running on port '+port);
})).
catch((err)=>{
 

  console.error("Failed to connect to MongoDB", err);

});



