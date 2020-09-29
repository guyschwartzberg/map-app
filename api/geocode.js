const request = require('postman-request')

const geocode = (address, callback) => {
    const url = `https://eu1.locationiq.com/v1/search.php?key=${process.env.LOCATIONIQ_ACCESS_TOKEN}&q=${encodeURIComponent(address)}&countrycodes=IL,PS&format=json&limit=1&normalizeaddress=1&accept-language=native`
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