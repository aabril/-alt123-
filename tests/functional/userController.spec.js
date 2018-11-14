const request = require('supertest');
const app = require('../../src/app.js')

describe('Resource:User', () => {
    describe(`POST /users/create`, () => {
      describe('missing parameters', () => {
        test('response error', async () => {
          const postParams = {}
          const response = await request(app).post('/users/create').send(postParams);
          expect(response.statusCode).toBe(200);
          expect(response.body.status).toEqual("error")
        });
      })

      describe('missing password', () => {
        test('response error', async () => {
          const timestamp = Math.floor(Date.now() / 1000)
          const domain = 'college01.com'
          const postParams = {
            email: `user_${timestamp}@${domain}`,
          }
          const response = await request(app).post('/users/create').send(postParams);
          // expect(response.statusCode).toBe(200);
          expect(response.body.status).toEqual("error")
        });
      })

      describe('missing password', () => {
        test('response error', async () => {
          const postParams = {
            password: 'random123'
          }
          const response = await request(app).post('/users/create').send(postParams);
          // expect(response.statusCode).toBe(200);
          expect(response.body.status).toEqual("error")
        });
      })

      describe('email and password provided', () => {
        test('response 200 and success', async () => {
          const timestamp = Math.floor(Date.now() / 1000)
          const domain = 'college01.com'
          const email = `user_${timestamp}@${domain}`
          const password = 'random123'

          const postParams = {
            email,
            password
          }

          const response = await request(app).post('/users/create').send(postParams);
          expect(response.body.status).toEqual("success")
          expect(response.body.data.hasOwnProperty("token")).toBe(true)
        });
      })

    })

    describe(`POST /users/signin`, () => {
      describe('missing parameters', () => {
        test('response error', async () => {
          const postParams = {}
          const response = await request(app).post('/users/signin').send(postParams);
          expect(response.statusCode).toBe(200);
          expect(response.body)
        });
      })

      describe('missing password', () => {
        test('response error', async () => {
          const timestamp = Math.floor(Date.now() / 1000)
          const domain = 'college01.com'
          const postParams = {
            email: `user_${timestamp}@${domain}`,
          }
          const response = await request(app).post('/users/signin').send(postParams);
          // expect(response.statusCode).toBe(200);
          expect(response.body.status).toEqual("error")
        });
      })

      describe('missing password', () => {
        test('response error', async () => {
          const postParams = {
            password: 'random123'
          }
          const response = await request(app).post('/users/signin').send(postParams);
          expect(response.body.status).toEqual("error")
        });
      })

      describe('email and password provided', () => {
        test('response 200 and success', async () => {
          const timestamp = Math.floor(Date.now() / 1000)
          const domain = 'college01.com'
          const email = `user_${timestamp}@${domain}`
          const password = 'random123'

          const postParams = {
            email,
            password
          }

          await request(app).post('/users/create').send(postParams);
          const loginResponse = await request(app).post('/users/signin').send(postParams)

          // expect(response.statusCode).toBe(200);
          expect(loginResponse.body.status).toEqual("success")
          expect(loginResponse.body.data.hasOwnProperty("token")).toBe(true)
        });
      })

    })

})