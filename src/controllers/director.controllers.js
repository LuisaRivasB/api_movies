const catchError = require('../utils/catchError');
const Director = require('../models/Director');

const getAll = catchError(async(req, res) => {
    const director = await Director.findAll();
    return res.json(director);
});

const create = catchError(async(req, res) => {
    const director = await Director.create(req.body);
    return res.status(201).json(director);
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const director = await Director.findByPk(id);
    if(!director) return res.sendStatus(404);
    return res.json(director);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    await Director.destroy({ where: {id} });
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    const director = await Director.update(
        req.body,
        { where: {id}, returning: true }
    );
    if(director[0] === 0) return res.sendStatus(404);
    return res.json(director[1][0]);
});

module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update
}