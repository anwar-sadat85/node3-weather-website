const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express()

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialspath = path.join(__dirname,'../templates/partials')

//Set up handlebars engine and views location
app.set('view engine','hbs');
app.set('views',viewsPath);

//hbs partials settings
hbs.registerPartials(partialspath);

//Set up static directory to serve
app.use(express.static(publicDirectoryPath));

//routes
app.get('',  (req, res) => {
    res.render('index',{
        title:'Weather App',
        name:'Anwar Sadat'
    })
})

app.get('/about',  (req, res) => {
    res.render('about',{
        title:'About me',
        name:'Anwar Sadat'
    })
})

app.get('/help',  (req, res) => {
    res.render('help',{
        helpText:'This is a helpful message',
        title:'Help',
        name:'Anwar Sadat'
    })
})
app.get('/weather',  (req, res) => {
    if(!req.query.address){
        return res.send({
            error:'Please provide an address'
        })
    }

    geocode(req.query.address,(error,{location,latitude,longitude} = {})=>{
        if(error){
            return res.send(
                {error}
            );
        }
        forecast(latitude,longitude, (error, {temperature,feelslike} = {}) => {
            if(error){
                return res.send(
                    {error}
                );
            }
            res.send({
                temperature,
                feelslike,
                location,
                address:req.query.address
            })
            
        })
    });
    
})



app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Anwar Sadat',
        errorMessage:'Help article not found'
    });
})

//404 setting

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Anwar Sadat',
        errorMessage:'Page not found'
    });
})

app.listen(3000,()=>{
    console.log('Server is up on 3000');
});