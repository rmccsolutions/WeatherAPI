import bodyParser from "body-parser";

export default function middleware(app: any) {
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(function (req: any, res: any) {
    res.status(404).send({ url: req.originalUrl + " not found" });
  });
}
