import { test } from "@japa/runner";
import { app } from "../app";
import { PreferenceService } from "../app/services/PreferenceService";
import UnauthorizedException from "../app/exceptions/UnauthorizedException";
import UnprocessableEntityException from "../app/exceptions/UnprocessableEntityException";
import { request } from "http";

test.group("PreferenceService", (group) => {
  group.setup(async () => {});

  group.teardown(async () => {});

  //Preference Service good Get request
  test("PreferenceService Good GET Request", async ({
    expect,
  }, done: Function) => {
    // //Random token for test
    // //Set token and auth header values
    // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJjeGFyYXVzYSIsImlhdCI6MTY1MjIwMzIxM30.uod0RxPPdDdluWDjzycVjv4QC_pHxDNeMY76Nbg2Q6k";
    // const auth = {
    //     Authorization: "Bearer ".concat(token),
    //     Accept: "application/json",
    // };

    const goodUser = { uid: "cxarausa", iat: "166802692" };

    const preferences = await PreferenceService.getPreferences(goodUser);

    expect(preferences).toHaveProperty("darkmode", true || false);

    done();
  }).waitForDone();

  //getPreferences bad auth request
  test("PreferenceService GET Request Bad Auth", async ({
    expect,
  }, done: Function) => {
    // //Random token for test
    // //Set token and auth header values
    // const badToken = "badJWT";
    // const badAuth = {
    //     Authorization: "Bearer ".concat(badToken),
    //     Accept: "application/json",
    // };

    const badUser = { uid: "fakeuser", iat: "166802692" };

    //Try to get preferences and expect unauthorizedException
    try {
      await PreferenceService.getPreferences(badUser);
    } catch (err) {
      expect(err).toBeInstanceOf(UnprocessableEntityException);
      done();
    }
  }).waitForDone();

  //postPreferences good request
  test("PreferenceService Good POST Request", async ({
    expect,
  }, done: Function) => {
    // //Set auth header
    // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJjeGFyYXVzYSIsImlhdCI6MTY1MjIwMzIxM30.uod0RxPPdDdluWDjzycVjv4QC_pHxDNeMY76Nbg2Q6k";
    // const auth = {
    //     Authorization: "Bearer ".concat(token),
    //     Accept: "application/json",
    // };

    const goodUser = { uid: "cxarausa", iat: "166802692" };

    //Populate JSON body with preferences
    const preferences = JSON.stringify({ darkmode: true });
    //Call postPreferences sending in body with authHeader
    const newPreferences = await PreferenceService.postPreferences(
      preferences,
      goodUser
    );

    expect(newPreferences).toHaveProperty("preferences");

    done();
  }).waitForDone();

  //postPreferences bad auth
  test("PreferenceService POST Request Bad Auth", async ({
    expect,
  }, done: Function) => {
    // //Set bad auth header
    // const badToken = "badJWT";
    // const badAuth = {
    //     Authorization: "Bearer ".concat(badToken),
    //     Accept: "application/json",
    // };

    const badUser = { uid: "fakeuser", iat: "166802692" };

    //Populate JSON body with preferences
    const preferences = JSON.stringify({ darkmode: true });
    //Call postPreferences sending in body with authHeader

    try {
      const newPreferences = await PreferenceService.postPreferences(
        preferences,
        badUser
      );
    } catch (err) {
      expect(err).toBeInstanceOf(UnprocessableEntityException);
      done();
    }
  }).waitForDone();

  //postPreferences bad input
  test("PreferenceService POST Request Bad Input", async ({
    expect,
  }, done: Function) => {
    // //Set auth header
    // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJjeGFyYXVzYSIsImlhdCI6MTY1MjIwMzIxM30.uod0RxPPdDdluWDjzycVjv4QC_pHxDNeMY76Nbg2Q6k";
    // const auth = {
    //     Authorization: "Bearer ".concat(token),
    //     Accept: "application/json",
    // };

    const goodUser = { uid: "cxarausa", iat: "166802692" };

    //Populate JSON body with preferences
    const preferences = JSON.stringify({ darkmode: "BadInput" });
    //Call postPreferences sending in body with authHeader
    try {
      const newPreferences = await PreferenceService.postPreferences(
        preferences,
        goodUser
      );
    } catch (err) {
      expect(err).toBeInstanceOf(UnprocessableEntityException);
      done();
    }
  }).waitForDone();
});
