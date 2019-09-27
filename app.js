const express = require('express');
const path = require('path');
const homeRoutes = require('./routes/home');
const usersRoutes = require('./routes/users');
const cardsRoutes = require('./routes/cards');

const undfRoute = { message: 'Запрашиваемый ресурс не найден' };

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

app.use('/', homeRoutes);
app.use('/users', usersRoutes);
app.use('/cards', cardsRoutes);

// как вариант можно вынести отдельным роутом
app.get('*', (req, res) => {
  res.status(404).send(undfRoute);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on port: ${PORT}`);
});
