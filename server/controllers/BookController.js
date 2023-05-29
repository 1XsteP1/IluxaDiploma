const ApiError = require('../error/ApiError');
const { Book, Author } = require('../models/models');
const uuid = require('uuid');
const path = require('path');

class BookController {
  async getAll(req, res) {
    const Books = await Book.findAll({ include: { model: Author, attributes: ['Name'] } });
    return res.json(Books);
  }

  async getFiltered(req, res, body) {
    const { filters } = req.body;
    const Books = await Book.findAll({
      include: { model: Author, attributes: ['Name'] },
      where: filters,
    });
    return res.json(Books);
  }

  async create(req, res) {
    const { Name, Genre, IsAvailability, CountOfPages, DateOfpublication, Publicator, authorID } =
      req.body;
    console.log(DateOfpublication);
    const { Image } = req.files;
    const fileName = uuid.v4() + '.jpg';
    Image.mv(path.resolve(__dirname, '..', 'static', fileName));
    const created = await Book.create({
      Name,
      Genre,
      IsAvailability,
      CountOfPages,
      DateOfpublication,
      Publicator,
      Image: fileName,
      authorID,
    });
    return res.json(created);
  }

  async edit(req, res) {
    const {
      ID,
      Name,
      Genre,
      IsAvailability,
      CountOfPages,
      DateOfpublication,
      Publicator,
      authorID,
    } = req.body;

    /* const finded = await Book.findAll({ where: { ID } });

    let fileName = finded.Image;

    if (req.files !== null) {
      const { Image } = req.files;
      fileName = uuid.v4() + '.jpg';
      Image.mv(path.resolve(__dirname, '..', 'static', fileName));
    }

    const Image = fileName; */

    const edited = await Book.update(
      {
        Name,
        Genre,
        IsAvailability,
        CountOfPages,
        DateOfpublication,
        Publicator,
        authorID,
      },
      { where: { ID } },
    );
    return res.json(edited);
  }

  async delete(req, res) {
    const { ID } = req.body;
    const deleted = await Book.destroy({ where: { ID } });
    return res.json(deleted);
  }
}

module.exports = new BookController();
