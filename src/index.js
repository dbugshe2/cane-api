const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const {startDatabase} = require('./database/mongo')
const {insertAd, getAds, updateAd, deleteAd}  = require('./database/ads')

// define express app
const app = express();


// for security
app.use(helmet());

// parse json bodies
app.use(bodyParser.json());

// enabling cors for all request
app.use(cors());

// add morgan for logging requests
app.use(morgan('combined'));

// endpoint to return all ads
app.get('/', async (req, res) => {
	res.send(await getAds());
});

//endpoint to add a new app
app.post('/', async (req, res) => {
  const newAd = req.body
  await insertAd(newAd)
  res.send({message: 'New Ad insserted'})
})

// endpoint to delete an ad
app.delete('/:id', async (req, res) => {
  await deleteAd(req.params.id)
  res.send({message: 'Ad removed.'})
})

// endpoint to update an ad
app.put('/:id', async (req, res) => {
  const updatedAd = req.body
  await updateAd(req.params.id, updateAd)
  res.send({message: 'Ad updated.'})
})

startDatabase().then(async () => {
  await insertAd({title: 'hello, now from in-memory db'})
  
  // starting the server
  app.listen(3001, async () => {
    console.log('listening on port 3001');
  });
})


