const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const homeRoutes = require('./routes/home');
const usersRoutes = require('./routes/users');
const cardsRoutes = require('./routes/cards');

const undfRoute = { message: 'Запрашиваемый ресурс не найден' };

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});
// mongoose.Promise = global.Promise;
// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));


app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', homeRoutes);
app.use('/users', usersRoutes);

app.use((req, res, next) => {
  req.user = {
    _id: '5d921594059a940a784706e2',
  };

  next();
});
app.use('/cards', cardsRoutes);

app.get('*', (req, res) => {
  res.status(404).send(undfRoute);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT);
