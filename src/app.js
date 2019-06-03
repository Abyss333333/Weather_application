const path = require ('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')




const app = express()

// Define paths for Express Config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


// Setup handlebar engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath) 
hbs.registerPartials(partialsPath)// takes a path to the directory where the partials live




// Setup static directory to server
app.use(express.static(publicDirectoryPath))



app.get('', (req,res) =>{ 
    res.render('index', {
        title: "Weather",
        name: "Abdullah"
    })
})

app.get('/about' , (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Abdullah'
    })
})

app.get('/help' , (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'No Help, Sorry :( ',
        name: 'Abdullah'
    })
})



app.get('/weather', (req, res) => {

    
    if (!req.query.address) {
        return res.send ({
            error: "You must provide an Address"
        })
   }
   const address = req.query.address
   geocode(address, (error, { latitude, longtitude, location } = {}) => {

    if (error) {
         return res.send ({
            error
        }) 
    }


    forecast(longtitude, latitude, (error, forecastData) => {

        if (error) {
            return res.send ({
               error
           }) 
       }

       res.send({

         
        forecast: forecastData,
        location: location,
        address: address
        


    })
    })
})
    

})

app.get('/products', (req,res)=>{
    
   if (!req.query.search) {
        return res.send ({
            error: "You must provide a search term"
        })
   }

   
    console.log(req.query.search)
    res.send ({
        products: []
    })
})

app.get ('/help/*', (req,res) =>{
    res.render('404',{
        title: '404 Help',
        name:'Abdullah',
        errorMessage: 'Help Article Not Found'})
}) 

//needs to be at the end.
app.get ('*', (req,res) =>{ //match anything that hasnt been matched so far (url)
    res.render('404',{
        title: 'ERROR 404',
        name:'Abdullah',
        errorMessage: 'Page Not Found'})
})




//app.com
//app.com/help
//app.com/about

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})