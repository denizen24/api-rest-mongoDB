const { Router } = require('express');
const path = require('path');
const contents = require('../data/users.json');
const { createUser } = require('../controllers/users');

const router = Router();
const errRoute = { message: 'Нет пользователя с таким id' };

router.post('/', createUser);

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'data', 'users.json'));
});

router.get('/:id', (req, res) => {
  const idx = req.params.id;

  const user = contents.find((item) => item._id === idx);
  if (!user) {
    res.status(404).send(errRoute);
    return;
  }

  res.send(`Пользователь: ${JSON.stringify(user)}`);
});

module.exports = router;
