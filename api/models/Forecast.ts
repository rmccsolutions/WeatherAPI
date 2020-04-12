/**
 * Forecast
 */
export default class Forecast {
  public temp: number;
  public high?: number;
  public low?: number;
  public feelsLike?: number;
  public status: string;
  public hourly?: [Forecast];
  /**
   * Current time, unix, UTC
   *
   * @type {number}
   * @memberof Forecast
   */
  public date: number;

  /**
   * @param {number} high
   * @param {number} low
   * @param {number} feelsLike
   * @param {string} status
   */
  constructor(temp: number, status: string, date: number) {
    this.temp = temp;
    this.status = status;
    this.date = date;
  }
}
