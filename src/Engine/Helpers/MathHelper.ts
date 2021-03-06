export default class MathHelper
{
  /**
   * Случайное число в диапазоне
   * @param min 
   * @param max 
   */
  public static randomInt(min: number, max: number): number
  {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}