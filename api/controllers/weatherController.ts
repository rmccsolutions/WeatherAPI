//TODO: Forcast data provider

import Google from "../models/DataManager/Providers/LocationProvider/Google";
import WeatherLocation from "../models/WeatherLocation";
/**
 * @param req
 * @param res Seven day forecast
 */
export const sevenDayforecasts = (req: any, res: any) => {
  let weatherLocation: WeatherLocation = new WeatherLocation("miami", "fl");
  let google: Promise<any> = Google.byCityandRegion(weatherLocation);
  google
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
};
