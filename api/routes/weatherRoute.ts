export default function weather(app: any) {
  const weatherController = require("../controllers/weatherController");
  app.route("/").get(weatherController.sevenDayforecasts);
}
