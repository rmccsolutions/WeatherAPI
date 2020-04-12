/**
 * Forecast
 */
export default class Forecast {
  public high: number;
  public low: number;
  public feelsLike: number;
  public status: string;
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
  constructor(
    high: number,
    low: number,
    feelsLike: number,
    status: string,
    date: number
  ) {
    this.high = high;
    this.low = low;
    this.feelsLike = feelsLike;
    this.status = status;
    this.date = date;
  }
}
