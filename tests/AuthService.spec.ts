import { test } from '@japa/runner';
import { AuthService } from "../app/services/AuthService";

import UnauthorizedException from '../app/exceptions/UnauthorizedException'
import { group } from 'console';

test.group("AuthService", (group) => {

  //Group setup
  group.setup(async () => {
  

  })
  //Group teardown
  group.teardown(async () => {

  })


  //Login with good user credentials
  test("Login Good Credentials", async ({ expect }, done: Function) => {
    //username and password consistent with project spec
    const username = "cxarausa";
    const password = "testing";

    //Expecting the login function in AuthService to return the token
    const token = await AuthService.login(username, password);

    expect(token).toMatchObject({ token });

    done();
  }).waitForDone();

  //Throw UnauthorizedException with bad credentials on login
  test("Login Bad Credentials", async ({ expect }, done: Function ) => {
    const badUsername = "badUser";
    const badPassword = "1234";

    try {
      await AuthService.login(badUsername, badPassword);
    }
    catch (err) {
      expect(err).toBeInstanceOf(UnauthorizedException)
      done();
    }
  }).waitForDone();

});
