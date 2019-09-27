const Card = require('../models/card');

module.exports.createCard = (req, res) => {
  const { name, owner, likes } = req.body;

  Card.create({ name, owner, likes })
    .then((card) => res.send({ data: card }))
    .catch((err) => res.status(500).send({ message: 'Произошла ошибка' }));
};
