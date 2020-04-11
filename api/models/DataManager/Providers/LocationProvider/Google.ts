import fetch from "node-fetch";
import WeatherLocation from "../../../WeatherLocation";
export default class Google {
  /**
   * Retrieves the locations lat and long by
   * city and region.
   *
   * @static
   * @param {WeatherLocation} weatherLocation
   * @returns {Promise<WeatherLocation>}
   * @memberof Google
   */
  public static async byCityandRegion(
    weatherLocation: WeatherLocation
  ): Promise<WeatherLocation> {
    let url: string = `${process.env.GOOGLE_BASE_URL || ""}${
      weatherLocation.city
    },${weatherLocation.region}&key=${process.env.GOOGLE_KEY || ""}`;
    console.log(url);
    //fetch the location data
    let googleGeoLocation: any = await fetch(url);

    //covert to json
    googleGeoLocation = await googleGeoLocation.json();

    if (googleGeoLocation.error_message !== undefined) {
      throw new Error(googleGeoLocation.error_message);
    }

    //grab the geomentry object
    let geometry = googleGeoLocation.results.pop().geometry;
    let long: number = geometry.location.lng;
    let lat: number = geometry.location.lat;

    //set lat and long
    weatherLocation.setLong(long);
    weatherLocation.setLat(lat);

    return weatherLocation;
  }
}
