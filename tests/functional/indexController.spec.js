const request = require('supertest');
const app = require('../../index.js')

describe('Test the root path', () => {
    test('It should response 200 to the GET method', async () => {
        const response = await request(app).get('/');
        expect(response.statusCode).toBe(200);
    });
})