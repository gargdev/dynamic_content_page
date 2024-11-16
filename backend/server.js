const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error(err));

// Routes
const contentRoutes = require('./routes/contentRoutes');
app.use('/api/content', contentRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
