const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const quizRoutes = require('./routes/quizzes.js');
const authRoutes = require('./routes/auth.js')

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/quizzes', quizRoutes);
app.use('/api/auth',authRoutes)

mongoose.connect('mongodb://localhost/quiz-app', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

app.listen(5000, () => console.log('Server running on port 5000'));