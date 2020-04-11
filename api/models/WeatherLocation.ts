/**
 * Location
 */
export default class WeatherLocation {
  public city: string;
  public region: string;
  private lat: number;
  private long: number;

  /**
   * @param {string} city
   * @param {string} region
   */
  constructor(city: string, region: string) {
    if (city === undefined || !city || city.length < 3) {
      throw new Error("Invalid city");
    }
    if (region === undefined || !region || region.length < 2) {
      throw new Error("Invalid region");
    }

    this.city = city;
    this.region = region;
    this.lat = 0;
    this.long = 0;
  }

  /**
   * Set the lattitude
   * @param lat
   */
  public setLat(lat: number) {
    if (!lat) {
      throw new Error("Invalid lat");
    }

    this.lat = lat;
  }

  /**
   * Set the longitude
   * @param long
   */
  public setLong(long: number) {
    if (!long) {
      throw new Error("Invalid long");
    }
    this.long = long;
  }

  /**
   * Lattitude
   * @returns {number} lat
   */
  public getLat(): number {
    return this.lat;
  }

  /**
   * Longitude
   * @returns {number} long
   */
  public getLong(): number {
    return this.long;
  }
}
