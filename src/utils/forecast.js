const request = require('postman-request')



const forecast = (lat, long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=5e0dab95a18b57cf32b9c13db18fef33&query=' + long + ',' + lat + '&units=f'
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            console.log("check internet confection", undefined)
        }
        if (body.error) {
            console.log('invalid input', undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] + " is " + body.current.temperature + " deg but feels like " + body.current.feelslike + " deg and wind speed is " + body.current.wind_speed)
        }






    })
}

module.exports = forecast