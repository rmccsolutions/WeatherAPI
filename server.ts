import express from "express";
import dotenv from "dotenv";
import weatherRoutes from "./api/routes/weatherRoute";
import middleware from "./api/routes/middleware";

dotenv.config();
//Top level express function
const app = express();
//Port app will be listening from
const port = 3000;

//Add middleware
middleware(app);
//Weather routes
weatherRoutes(app);

app.listen(port);

console.log("Weather RESTful API server started on: " + port);
