import bodyParser from "body-parser";
import methodOverride from "method-override";

/**
 * Simple middleware to check route
 * @param app
 */
export default function middleware(app: any) {
  //Parse incoming request bodies in a middleware before your handlers
  app.use(bodyParser());
  app.use(methodOverride());

  //Error handling
  app.use(function (req: any, res: any, next: any) {
    res.header("Access-Control-Allow-Origin", process.env.CLIENT_URL); //update to match the domain you will make the request from
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept,city,region"
    );
    if (req.originalUrl !== "/") {
      res.redirect("/");
    }
    next();
  });
}
