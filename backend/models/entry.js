const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const entrySchema = new Schema({
  games: {
    type: [String],
    required: true,
  }, image: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Entry', entrySchema);