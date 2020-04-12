import ForecastManager from "../models/DataManager/ForecastManager";
import WeatherLocation from "../models/WeatherLocation";
import WeatherViewModel from "../view_models/WeatherViewModel";
import WeatherLocationViewModel from "../view_models/WeatherLocationViewModel";
import ProviderViewModel from "../view_models/ProviderViewModel";
import WeatherProvider from "../models/DataManager/Providers/WeatherProvider";
/**
 * @param req
 * @param res Seven day forecast
 */
export const multiDayforecasts = (req: any, res: any) => {
  if (req.headers.city === undefined || req.headers.city.length < 2) {
    res.json(400, { message: "Invalid city." });
  }
  if (req.headers.region === undefined || req.headers.region.length < 2) {
    res.json(400, { message: "Invalid region." });
  }

  //get lat and long for location
  let weatherLocation: WeatherLocation = new WeatherLocation(
    req.headers.city,
    req.headers.region
  );
  //get multiday  forecast
  let forecastManager: ForecastManager = new ForecastManager(weatherLocation);
  forecastManager
    .getMultiDayDayForcasts()
    .then((result) => {
      //get who provided the forecast for us
      let forecastManagerProvider: WeatherProvider = forecastManager.getProvider();
      //mock out view models
      let weatherLocationViewModel: WeatherLocationViewModel = new WeatherLocationViewModel(
        weatherLocation.city,
        weatherLocation.region,
        weatherLocation.getLat(),
        weatherLocation.getLong()
      );
      let providerViewModel: ProviderViewModel = new ProviderViewModel(
        forecastManagerProvider.getName(),
        forecastManagerProvider.getUrl(),
        forecastManagerProvider.getIconUrl()
      );
      let weatherViewModel: WeatherViewModel = new WeatherViewModel(
        providerViewModel,
        weatherLocationViewModel,
        result
      );
      return weatherViewModel;
    })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
};
