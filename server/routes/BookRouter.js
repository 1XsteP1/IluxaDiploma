const Router = require('express');
const BookController = require('../controllers/BookController');
const router = new Router();

router.post('/', BookController.getAll);
router.post('/create', BookController.create);
router.post('/delete', BookController.delete);
router.post('/edit', BookController.edit);
router.post('/filter', BookController.getFiltered);

module.exports = router;
