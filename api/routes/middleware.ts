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
    if (req.originalUrl !== "/") {
      res.redirect("/");
    }
    next();
  });
}
