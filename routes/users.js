const { Router } = require('express');
const { createUser } = require('../controllers/users');
const User = require('../models/user');

const router = Router();
const errRoute = { message: 'Нет пользователя с таким id' };

router.post('/', createUser);

router.get('/', (req, res) => {
  User.find({})
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
});

router.get('/:id', (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (user) {
        res.send({ data: user });
      }
      res.status(404).send(errRoute);
    })
    .catch(() => res.status(404).send(errRoute));
});

// router.patch('/me', (req, res) => {
//   User.findByIdAndUpdate(req.params.id)
//     .then((user) => res.send({ data: user }))
//     .catch(() => res.status(404).send(errRoute));
// });

module.exports = router;
