const express = require('express');
const path = require('path');
const app = express();
const csv = require('csvtojson');
const geocode = require('./geocode.js')

app.use(express.json())


app.get('/city', async (req, res) => {
  if (!req.query.address) {
    return res.status(400).send()
  }
  try {
  const data = await csv().fromFile('api/assets/cities_csv.csv')
  const city = data.find((city) => city['Hebrew name'].replace("-", ' ') === req.query.address.replace("-", ' '))
  if (!city) {
    return res.status(404).send()
  }
  geocode(city['English name'], (error, body) => {
    if (error) {
      return res.status(500).send(error)
    }
    body.population = city.Population
    body.hebrewName = city['Hebrew name']
    res.send(body)
  })
} catch (e) { 
  res.status(500).send(e)
}
})

app.use(express.static(path.join(__dirname, '..', 'build')));

const PORT = process.env.PORT || 5000

app.use('/*', async (request, response) => {
  response.sendFile(path.join(__dirname, '..', '/build/index.html'));
});

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`)
});