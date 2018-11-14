const request = require('supertest');
const app = require('../../src/app.js')

const ROUTE = "/books"

describe('Resource:Book', () => {
    describe(`GET ${ROUTE}`, () => {
        test('response 200', async () => {
            const response = await request(app).get(ROUTE);
            expect(response.statusCode).toBe(200);
        });

        test('response is formatted in JSEND', async () => {
            const response = await request(app).get(ROUTE);
            expect(response.body.hasOwnProperty("status")).toBe(true);
            expect(response.body.hasOwnProperty("data")).toBe(true);
        });
    })
})