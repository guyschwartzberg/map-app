const express = require('express');
const path = require('path');
const app = express();
const csv = require('csvtojson');
const geocode = require('./geocode.js')

app.use(express.json())

const PORT = process.env.PORT || 5000;

app.get('/city', async (req, res) => {
  if (!req.query.address) {
    return res.status(400).send()
  }
  try {
  const data = await csv().fromFile(path.join(__dirname, '/assets/cities_csv.csv'))
  const city = data.find((city) => city['Hebrew name'].replace(/-/g, ' ').split('#').some((city2) => city2 === req.query.address.replace(/-/g, ' ')))
  if (!city) {
    return res.status(404).send()
  }
  geocode(city['Hebrew name'].split("#")[0], (error, body) => {
    if (error) {
      return res.status(500).send(error)
    }
    body.population = city.Population
    body.hebrewName = city['Hebrew name'].split("#")[0]
    res.send(body)
  })
} catch (e) { 
  res.status(500).send(e)
}
})

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, '../client/build')));

  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });
}

var server = app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`)
});