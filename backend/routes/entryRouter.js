const entryRouter = require('express').Router();
let Entry = require('../models/entry');

entryRouter.route('/:skip').get((req, res) => {
  var skip = parseInt(req.params.skip);
  Entry.find()
    .limit(6)
    .skip(skip)
    .then(entries => res.json(entries))
    .catch(err => res.status(400).json('Error: ' + err));
});

entryRouter.route('/search/:skip/:tags').get((req, res) => {
  var skip = parseInt(req.params.skip);
  var tags = req.params.tags.replaceAll('_', ' ');
  Entry.find( {games: tags} )
    .limit(6)
    .skip(skip)
    .then(entries => res.json(entries))
    .catch(err => res.status(400).json('Error: ' + err));
});

entryRouter.route('/view/:id').get((req, res) => {
    Entry.findById(req.params.id)
      .then(entry => res.json(entry))
      .catch(err => res.status(400).json('Error: ' + err));
  });

entryRouter.route('/add').post((req, res) => {
  const games = req.body.games;
  const image = req.body.image;

  const newEntry = new Entry({
    games,
    image
  });

  newEntry.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = entryRouter;