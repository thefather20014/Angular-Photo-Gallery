const { Router } = require('express');
const Controller = require('../Controller/Movies.Controller');
const multer = require('multer');

const router = Router();

router.get('/', Controller.getMovies);
router.post('/', Controller.createMovie);
router.get('/:id', Controller.getMovie);
router.put('/:id', Controller.updatedMovie);
router.delete('/:id', Controller.deleteMovie);

module.exports = router;