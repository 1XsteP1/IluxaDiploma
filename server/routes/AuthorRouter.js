const Router = require('express');
const AuthorController = require('../controllers/AuthorController');
const router = new Router();

router.post('/', AuthorController.getAll);
router.post('/create', AuthorController.create);
router.post('/delete', AuthorController.delete);
router.post('/edit', AuthorController.edit);

module.exports = router;
