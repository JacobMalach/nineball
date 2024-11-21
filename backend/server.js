const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({
  origin: ['http://localhost:3000', 'https://your-backend-url.onrender.com', 'https://nineball.vercel.app/'], 
}));
app.use(express.json({limit: '25mb'}));

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true}
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const entryRouter = require('./routes/entryRouter');

app.use('/entry', entryRouter);

app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on port: ${port}`);
});