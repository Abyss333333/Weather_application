const request = require('request')

const forecast = (longtitude, latitude, callback) => {
    const url = 'https://api.darksky.net/forecast/0f67445d39e4461911196af5c73705b7/' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longtitude) +'?units=si'
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service', undefined)
        } else if (body.error) {
            callback ('Unable to Find Location', data)
        }
        else {
            callback(undefined, body.daily.data[0].summary + 'It is currently ' + body.currently.temperature + ' degrees out. There is a ' + (body.currently.precipProbability * 100)+ ' % chance of rain')
                
                
            
        }

    })


}

module.exports = forecast