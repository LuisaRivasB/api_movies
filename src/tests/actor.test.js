const request = require('supertest');
const app = require('../app');
require('../models');

let actorId;

test('POST /actors', async () => {
    const actor = {
        firstName: "Kevin ",
        lastName: "Hart",
        nationality: "American",
        image: "https://www.shutterstock.com/image-photo/los-angeles-ca-march-25-2015-270273986",
        birthday: "1979-07-06"
    }
    const res = await request(app).post('/actors').send(actor);
    actorId = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
});

test('GET /actors ', async() => {
    const res = await request(app).get('/actors');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
});

test('PUT /actors/:id ', async () => {
    const actorUpdated =  {
        birthday: "1979-06-07"
    }
    const res = await request(app)
    .put(`/actors/${actorId}`)
    .send(actorUpdated);
expect(res.status).toBe(200);
expect(res.body.name).toBe(actorUpdated.name);
});

test('DELETE /actors/:id', async () => {
    const res = await request(app).delete(`/actors/${actorId}`);
    expect(res.status).toBe(204);
});