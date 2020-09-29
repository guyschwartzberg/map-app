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

app.use(express.static(path.join(__dirname, '..', 'build')));

const PORT = process.env.PORT

app.use('/*', async (request, response) => {
  response.sendFile(path.join(__dirname, '..', '/build/index.html'));
});

var server = app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`)
  console.log(server.address().address)
});