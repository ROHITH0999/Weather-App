const express= require("express");
const hbs = require('hbs');
const path = require('path');
const app=express();
const Port=process.env.PORT || 3000;

// console.log(path.join(__dirname,'../public'))

const indexPath=path.join(__dirname,'../public');
const viewPath=path.join(__dirname,'../templates/views');
const partialPath=path.join(__dirname,"../templates/partials")


app.set("views",viewPath);
hbs.registerPartials(partialPath);
app.set("view engine","hbs");




app.use(express.static(indexPath));



//routing
app.get('',(req,res)=>{
    
    res.render('index')
})
app.get('/about',(req,res)=>{
    
    // res.send('About Page');
    res.render('about');
})
app.get('/weather',(req,res)=>{
    
    res.render('weather')
})
app.get('*',(req,res)=>{
    
    res.render('404err')
})

app.listen(Port,()=>{
    console.log(`Connected Successfully Port no: ${Port}.....`);
})