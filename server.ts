import express from "express";
import weatherRoutes from "./api/routes/weatherRoute";
import middleware from "./api/routes/middleware";

const app = express();
const port = process.env.PORT || 3000;

middleware(app);
weatherRoutes(app);

app.listen(port);

console.log("Weather RESTful API server started on: " + port);
