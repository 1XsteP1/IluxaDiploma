const bcrypt = require('bcrypt');
const ApiError = require('../error/ApiError');
const { User } = require('../models/models');
const jwt = require('jsonwebtoken');

const generateJWT = (id, Name, role) => {
  return jwt.sign({ id: id, Name: Name, role: role }, process.env.SECRET_KEY, {
    expiresIn: '24h',
  });
};

class UserController {
  async registration(req, res, next) {
    const { name, password } = req.body;

    console.log(name, password);

    const role = 'USER';

    if (!name || !password) {
      return next(ApiError.badRequest('Некорректный логин или пароль!'));
    }

    const candidate = await User.findOne({ where: { Name: name } });
    if (candidate) {
      return next(ApiError.badRequest('Такой пользователь уже существует'));
    }

    const hashPass = await bcrypt.hash(password, 5);
    const user = await User.create({
      Name: name,
      Password: hashPass,
      Role: role,
    });
    const token = generateJWT(user.ID, user.Name, role);
    return res.json({ token });
  }

  async login(req, res, next) {
    const { name, password } = req.body;

    const user = await User.findOne({ where: { Name: name } });
    if (!user) {
      return next(ApiError.internal('User not found'));
    }

    let compare = bcrypt.compareSync(password, user.Password);
    if (!compare) {
      return next(ApiError.internal('Неправильный пароль!'));
    }

    const token = generateJWT(user.ID, user.Name, user.Role);
    return res.json({ token });
  }

  async auth(req, res) {
    const token = generateJWT(req.user.id, req.user.Name, req.user.role);
    return res.json({ token });
  }
  /* 
  async getAll(req, res) {
    const response = await User.findAll();
    return res.json(response);
  }

  async delete(req, res) {
    const { id } = req.body;
    const deleted = await User.destroy({ where: { ID: id } });
    return res.json(deleted);
  }

  async edit(req, res, next) {
    const ID = req.body.values[0];
    if (req.body.values[1] === undefined) {
      return next(ApiError.internal('Заполните поле, которое хотите изменить!'));
    }
    const { Name, Age, Phone, Email, Role } = req.body.values[1];
    console.log(FIO, Age, Phone, Email, Role);
    const updated = await User.update({ FIO, Age, Phone, Email, Role }, { where: { ID } })
      .then((result) => {
        return res.json(FIO);
      })
      .catch((result) => next(ApiError.badRequest('Что-то пошло не так!')));
  } */
}

module.exports = new UserController();
