const ApiError = require('../error/ApiError');
const { Book, Author, Card, User } = require('../models/models');

class CardController {
  async get(req, res) {
    const { id } = req.body;
    const Books = await Card.findAll({
      include: [{ model: Book, attributes: ['Name'] }],
      where: { userID: id },
    });
    return res.json(Books);
  }

  async getAll(req, res) {
    const Books = await Card.findAll({
      include: [
        { model: Book, attributes: ['Name'] },
        { model: User, attributes: ['Name'] },
      ],
    });
    return res.json(Books);
  }

  async create(req, res, next) {
    const { bookID, userID } = req.body;
    const Index = ((bookID + userID) * 2 + 10) * 6;
    const exsited = await Card.findOne({ where: { Index, bookID, userID } });
    if (!exsited) {
      const Books = await Card.create({ Index: Index, bookID, userID });
      return res.json(Books);
    } else {
      return next(ApiError.badRequest('Такую книгу вы уже взяли!'));
    }
  }

  async delete(req, res, next) {
    const { ID } = req.body;
    const deleted = await Card.destroy({ where: { ID } });
    return res.json();
  }

  async edit(req, res, next) {
    const { ID, Index, bookID, userID } = req.body;
    const updated = await Card.update({ Index, bookID, userID }, { where: { ID } });
    return res.json();
  }
}

module.exports = new CardController();
