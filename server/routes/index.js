const Router = require('express');

const router = new Router();
const userRouter = require('./userRouter');
const bookRouter = require('./BookRouter');
const cardRouter = require('./CardRouter');
const AuthorRouter = require('./AuthorRouter');

router.use('/user', userRouter);
router.use('/book', bookRouter);
router.use('/card', cardRouter);
router.use('/author', AuthorRouter);

module.exports = router;
