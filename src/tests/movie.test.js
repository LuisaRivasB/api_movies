const request = require('supertest');
const app = require('../app');
const Genre = require('../models/Genre');
const Actor = require('../models/Actor');
const Director = require('../models/Director');
require('../models')

let movieId;

test('POST /movies', async () => {
    const movie = {
        name: "Fatherhood ",
        image: "https://www.hachette.co.uk/wp-content/uploads/2019/04/hbg-title-9781473632868-51.jpg?fit=813%2C1250",
        synopsis: "Un padre (Kevin Hart) cría a su hija tras sufrir la pérdida de su mujer justo el día después de que ésta diese a luz.",
        releaseYear: "2021"
    }
    const res = await request(app).post('/movies').send(movie);
    movieId = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
});

test('GET /movies', async () => {
    const res = await request(app).get('/movies');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
    expect(res.body[0].genres).toBeDefined();
});

test('PUT /movies/:id ', async () => {
    const movieUpdated =  {
        name: "Fatherhood 2"
    }
    const res = await request(app)
    .put(`/movies/${movieId}`)
    .send(movieUpdated);
expect(res.status).toBe(200);
expect(res.body.name).toBe(movieUpdated.name);
});

test('POST /movies/:id/genres should set the movie genres', async () => {
    const genre = await Genre.create({ name: "Action" })
    const res = await request(app)
        .post(`/movies/${movieId}/genres`)
        .send([genre.id])
    await genre.destroy();
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
});

test('POST /movies/:id/actors should set the movie actors', async() => {
    const actor = await Actor.create({
        firstName: "Kevin ",
        lastName: "Hart",
        nationality: "American",
        image: "https://www.shutterstock.com/image-photo/los-angeles-ca-march-25-2015-270273986",
        birthday: "1979-07-06"
     })
    const res = await request(app)
        .post(`/movies/${movieId}/actors`)
        .send([actor.id])
    await actor.destroy();
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
});

test('POST /movies/:id/directors should set the movie directors', async() => {
    const director = await Director.create({
        firstName: "Paul",
        lastName: "Weitz",
        nationality: "American",
        image: "https://www.shutterstock.com/image-photo/los-angeles-ca-june-11-2015-386840860",
        birthday: "1965-11-19"
     })
    const res = await request(app)
        .post(`/movies/${movieId}/directors`)
        .send([director.id])
    await director.destroy();
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
});


test('DELETE /movies/:id', async () => {
    const res = await request(app).delete(`/movies/${movieId}`);
    expect(res.status).toBe(204);
});

