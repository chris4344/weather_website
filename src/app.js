const path = require('path')
const hbs = require('hbs')
const express = require('express')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const products = [
    { games: ['fr', 'as'] },
    { toys: ['ha', 'cost'] },
    { books: ['chch', 'k', 'l'] }
]
console.log(products[0])

const app = express()
const port = process.env.PORT || 4000
const public = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partails')

app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

app.use(express.static(public))

app.get('', (req, res) => {
    res.render('index', {
        title: 'weather app',
        name: 'Chris Pearce'
    })

})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'about me',
        name: 'Chris Pearce'
    })

})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'help',
        name: 'Chris Pearce'
    })
})






app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({ error: 'must provide address' })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })

})
app.get('/products', (req, res) => {

    if (!req.query.search) {
        return res.send({ error: 'error must provide search term' })
    }
    res.send({ prod: products })
})


app.get('/help/*', (req, res) => {
    res.render('error404', {
        title: 'article not found'
    })
})

app.get('*', (req, res) => {
    res.render('error404', {
        title: 'page not found 404'
    })
})

app.listen(port, () => {
    console.log('running')
})