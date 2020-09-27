const request = require('postman-request')

const geocode = (address, callback) => {
    const url = `https://eu1.locationiq.com/v1/search.php?key=pk.663a5c75fa6e11b8fff38ca8d1da8e5b&q=${encodeURIComponent(address)}&countrycodes=IL,PS&format=json&limit=1&normalizeaddress=1&accept-language=native`
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (body.error) {
            callback('Unable to find location. Try another search', undefined)
        } else {
            const {lat, lon, display_name } = body[0]
            callback(undefined, { 
                longitude: parseFloat(lon),
                latitude: parseFloat(lat),
                location: display_name,
                address } )
        }
    } )
}

module.exports = geocode