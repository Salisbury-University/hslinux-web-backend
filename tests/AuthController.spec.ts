import { test } from '@japa/runner';
import request from 'supertest';
import { app } from '../app';

import UnauthorizedException from '../app/exceptions/UnauthorizedException'


test.group('AuthController', (group) => {
    
    group.setup(async () => {

    });

    group.teardown(async () => {

    })

    //Testing user login
    test("User Login", async ({expect}, done: Function) => {
        const username = "cxarausa";
        const password = "testing";       
        
        request(app)
          .post('/api/v1/auth/login')
          .send({username, password})
          .set( 'Accept', 'application/json')
          .expect(200)
          .then(({ response }) => {
              //expecting the response body to have a token
              expect(response).toBe(String);
              //Extract token and verify its a real jwt
              const { token } = response;
              
              expect(token).toBeTruthy();

              done()
              //FOR THE FUTURE
              //Bring in the signature using env var and verify
              
          })
    }).waitForDone();

    //Testing user login with bad credentials
    test("Bad Credentials Login", async ({expect}, done: Function) => {
        const badUsername = "BadUsername";
        const badPassword = "BadPwd";

        request(app)
          .post('/api/v1/auth/login')
          .send({badUsername, badPassword})
          .set( 'Accept', 'application/json')
          .expect(422)
          .then(({ body }) => {
              //expecting response body to have UnauthorizedException message
              expect(body).toHaveProperty("message");
              //Extract message to verify its the correct message
              const { message } = body;
              
              expect(message).toBe("Unauthorized Access")

              done();
          })
    }).waitForDone();


})