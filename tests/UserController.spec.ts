import { test } from "@japa/runner";
import request from "supertest";
import { app } from "../app";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

test.group("UserController", (group) => {

    const username = "Bob";
    const password = "somepass";
    const groups = "students";

    //Create user in database
    group.setup(async () => {
    //    await prisma.user.create({
    //     data: {
    //         username: username,
    //         password: password,
    //         group: groups
    //     }
    //    });

    });


    group.teardown(async () => {

        // return await prisma.user.deleteMany({
        //     where: {
        //         username
        //     }
        // });
    });

    //Test User get request good credentials
    test("UserController Good GET Request", async ({ expect }, done: Function) => {
        request(app)
            .get("/api/v1/user/Bob")
            .set("Accept", "application/json")
            .expect(200)
            .then(({ body }) => {
                expect(body).toMatchObject( {
                    id: "Bob",
                    groups: "students"
                })

                done();
            });
    }).waitForDone();

    //Test User get request bad credentials
    test("UserController GET Request Bad Credentials", async ({ expect }, done: Function) => {
        const uid = "baduid";

        request(app)
            .get("/api/v1/user/".concat(uid))
            .set("Accept", "application/json")
            .expect(401)
            .then(({ body }) => {
                expect(body).toHaveProperty("message");

                const { message } = body;

                expect(message).toBe("Unauthorized Access");

                done();
            });
    }).waitForDone();

    //Test User get request no credentials
    test("UserController GET Request Null Credentials", async ({ expect }, done: Function) => {
        const uid = "";

        request(app)
            .get("/api/v1/user/".concat(uid))
            .set("Accept", "application/json")
            .expect(404)
            .then(({ body }) => {
                done();
            });
    }).waitForDone();
});