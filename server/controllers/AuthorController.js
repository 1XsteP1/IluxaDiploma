const { Author } = require('../models/models');

class AuthorController {
  async getAll(req, res, next) {
    const contracts = await Author.findAll();
    return res.json(contracts);
  }

  async delete(req, res, next) {
    const { ID } = req.body;
    const deleted = await Author.destroy({ where: { ID } });
    return res.json(deleted);
  }

  async create(req, res, next) {
    const { Name, Mark } = req.body;
    const created = await Author.create({ Name, Mark });
    return res.json(created);
  }

  async edit(req, res) {
    const { ID, Name, Mark } = req.body;
    const edited = await Author.update({ Name, Mark }, { where: { ID: ID } });
    return res.json(edited);
  }
}
module.exports = new AuthorController();
