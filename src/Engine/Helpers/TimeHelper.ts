export default class TimeHelper
{
  /**
   * Возвращает таймстамп в секундах
   */
  public static getCurrentTimestamp()
  {
    return Math.floor(Date.now() / 1000);
  }

  /**
   * Текущее время в мс
   */
  public static getCurrentMicrotime()
  {
    return (Date.now() % 1000) / 1000;
  }
}