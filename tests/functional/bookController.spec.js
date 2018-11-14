require('dotenv').config({ path: '../../env.test' });

const request = require('supertest');
const app = require('../../src/app.js')
const ROUTE = "/books"

describe('Resource:Book', () => {
    describe(`GET ${ROUTE}`, () => {
        test('response 200', async () => {
            const response = await request(app).get(ROUTE);
            expect(response.statusCode).toBe(200);
        });

        test('response is JSEND error as JwtUnauthorized', async () => {
            const response = await request(app).get(ROUTE);
            expect(response.body.status).toEqual("error");
            expect(response.body.code).toEqual("JwtUnauthorized");
        });

        test('response is JSEND success with data as an array', async () => {
            const timestamp = Math.floor(Date.now() / 1000)
            const domain = 'college01.com'
            const email = `user_${timestamp}@${domain}`
            const password = 'random123'
  
            const newUserPostParams = {
              email,
              password
            }
  
            const newUserResponse = await request(app).post('/users/create').send(newUserPostParams);
            const token = newUserResponse.body.data.token

            const response = await request(app)
                .get('/books')
                .set('Authorization', `Bearer ${token}`)

            expect(response.body.status).toEqual("success")
            expect(Array.isArray(response.body.data)).toBe(true)
        });



    })





})