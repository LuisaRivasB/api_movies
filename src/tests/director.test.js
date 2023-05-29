const request = require('supertest');
const app = require('../app');
require('../models');

let directorID;

test('POST /directors', async () => {
    const director = {
        firstName: "Paul",
        lastName: "Weitz",
        nationality: "American",
        image: "https://www.shutterstock.com/image-photo/los-angeles-ca-june-11-2015-386840860",
        birthday: "1965-11-19"
    }
    const res = await request(app).post('/directors').send(director);
    directorID = res.body.id
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
});

test('GET /directors ', async() => {
    const res = await request(app).get('/directors');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
});

test('PUT /directors/:id ', async () => {
    const directorUpdated =  {
        birthday: "1979-19-11"
    }
    const res = await request(app)
    .put(`/directors/${directorID}`)
    .send(directorUpdated);
expect(res.status).toBe(200);
expect(res.body.name).toBe(directorUpdated.name);
});

test('DELETE /directors/:id', async () => {
    const res = await request(app).delete(`/directors/${directorID}`);
    expect(res.status).toBe(204);
});