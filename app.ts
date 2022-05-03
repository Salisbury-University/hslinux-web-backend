// Import config to setup the global configuration object.
import { config } from "./config";
import express from "express";
const app = express();

/** Setup request body parsing */
import bodyParser from "body-parser";
app.use(bodyParser.json());

/** Import routers from ``app/routes/index`` **/
import indexRouter from "./app/routes/index";
import authRouter from "./app/routes/auth";

/** Configure application to use routers **/
app.use("/", indexRouter);
app.use(authRouter);

/** Global Middleware Example */
import ExampleMiddleware from "./app/http/middleware/ExampleMiddleware";

/** Using the middleware on all routes */
//app.use(ExampleMiddleware);

/** Using a custom error handler */
import ExceptionHandler from "./app/exceptions/ExceptionHandler";
app.use(ExceptionHandler);

/** Parse through frontmatter to be stored on server start */
import { parseFrontmatter } from "./mark";
parseFrontmatter();

export { app, config };
