import { test } from "@japa/runner";
import { UserService } from "../app/services/UserService";
import UnauthorizedException from "../app/exceptions/UnauthorizedException";

test.group("UserService", (group) => {
    //Group setup
    group.setup(async () => {});
    //Group teardown
    group.teardown(async () => {});

    //Test with good credentials
    test("UserService Good GET Request", async ({ expect }, done: Function) => {
        const uid = "Bob";

        //Call getInfo function in user service
        const userInfo = await UserService.getInfo(uid);

        //Expect user info to be returned
        expect(userInfo).toHaveProperty("groups");

        const groups = userInfo.groups;

        expect(groups).toBe("students");

        done();

    }).waitForDone();
    //Test with bad credentials
    test("UserService GET Request Bad Credentials", async ({ expect }, done: Function) => {
        const uid = "baduid";

        //Call getInfo function in user service
        try {
            const userInfo = await UserService.getInfo(uid);
        } catch (err) {
            expect(err).toBeInstanceOf(UnauthorizedException);
            done();
        }
 
    }).waitForDone();
    //Test with no credentials
    test("UserService GET Request Null Credentials", async ({ expect }, done: Function) => {
        const uid = "";

        //Call getInfo function in user service
        try {
            const userInfo = await UserService.getInfo(uid);
        } catch (err) {
            expect(err).toBeInstanceOf(UnauthorizedException);
            done();
        }
        
    }).waitForDone();
});