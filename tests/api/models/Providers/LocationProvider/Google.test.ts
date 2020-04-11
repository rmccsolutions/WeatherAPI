import Google from "../../../../../api/models/DataManager/Providers/LocationProvider/Google";
import WeatherLocation from "../../../../../api/models/WeatherLocation";
import dotenv from "dotenv";

dotenv.config();

test("Retrieve lattitude and longitude", async () => {
  let weatherLocation: WeatherLocation = new WeatherLocation("miami", "fl");
  let google: WeatherLocation = await Google.byCityandRegion(weatherLocation);
  expect(google.getLat()).toBe(25.7616798);
  expect(google.getLong()).toBe(-80.1917902);
});
