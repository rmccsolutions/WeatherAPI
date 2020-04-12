/**
 * WeatherLocationViewModel
 */
export default class WeatherLocationViewModel {
  public city: string;
  public region: string;
  public lat: number;
  public long: number;

  /**
   * @param {string} city
   * @param {string} region
   */
  constructor(city: string, region: string, lat: number, long: number) {
    this.city = city;
    this.region = region;
    this.lat = lat;
    this.long = long;
  }
}
