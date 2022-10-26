import { test } from "@japa/runner";
import { AuthService } from "../app/services/AuthService";
import UnauthorizedException from "../app/exceptions/UnauthorizedException";

test.group("AuthService", (group) => {
  //Group setup
  group.setup(async () => {});
  //Group teardown
  group.teardown(async () => {});

  //Login with good user credentials
  test("AuthService Good Login", async ({ expect }, done: Function) => {
    //username and password consistent with project spec
    const username = "Bob";
    const password = "passsome";

    //Expecting the login function in AuthService to return the token
    const token = await AuthService.login(username, password);

    expect(token).toBeTruthy();

    done();
  }).waitForDone();

  //Throw UnauthorizedException with bad credentials on login
  test("AuthService Bad Login", async ({ expect }, done: Function) => {
    const badUsername = "badUser";
    const badPassword = "1234";

    try {
      await AuthService.login(badUsername, badPassword);
    } catch (err) {
      expect(err).toBeInstanceOf(UnauthorizedException);
      done();
    }
  }).waitForDone();
});
