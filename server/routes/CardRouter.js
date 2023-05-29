const Router = require('express');
const CardController = require('../controllers/CardController');
const router = new Router();

router.post('/', CardController.get);
router.get('/', CardController.getAll);
router.post('/create', CardController.create);
router.post('/delete', CardController.delete);
router.post('/edit', CardController.edit);

module.exports = router;
