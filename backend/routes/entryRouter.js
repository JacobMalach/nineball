const entryRouter = require('express').Router();
let Entry = require('../models/entry');

entryRouter.route('/').get((req, res) => {
  Entry.find()
    .then(entries => res.json(entries))
    .catch(err => res.status(400).json('Error: ' + err));
});

entryRouter.route('/:id').get((req, res) => {
    Entry.findById(req.params.id)
      .then(entry => res.json(entry))
      .catch(err => res.status(400).json('Error: ' + err));
  });

entryRouter.route('/add').post((req, res) => {
  const games = req.body.games;

  const newEntry = new Entry({games});

  newEntry.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = entryRouter;