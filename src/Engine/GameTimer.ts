import TimeHelper from "./Helpers/TimeHelper";

export default class GameTimer
{
  /**
   * JS таймер выполнения
   */
  protected timer: any;

  /**
   * Js таймер задержки повторного запуска
   */
  protected delayTimeoutTimer: any;

  /**
   * Время старта в мс
   */
  protected startTime: number;

  /**
   * Время остановки в мс
   */
  protected stopTime: number;

  /**
   * Частота выполнения таймера в мс
   */
  protected rate: number;

  /**
   * Функция которую необходимо выполнить в таймере
   */
  public callback: any;

  /**
   * Идентификатор таймера в общем реестре. 
   * Заполняется при регистрации
   */
  public id: string;

  /**
   * Конструктор
   * @param callback
   * @param rate
   */
  public constructor(callback: any, rate: number)
  {
    this.rate = rate;
    this.callback = callback;
  }

  /**
   * Активен ли таймер
   */
  public getIsActive(): boolean
  {
    return !!this.delayTimeoutTimer || !!this.timer;
  }

  /**
   * Возвращает минимальную разницу между временем "старт" и "стоп"
   * начиная с которой включется механизм задержки запуска
   */
  public getStartDelayEdge()
  {
    return 100;
  }

  /**
   * Расчет задержки старта таймера после остановки
   */
  protected calculateStartDelay(): number
  {
    let edge = this.getStartDelayEdge();

    /**
     * Не применяем задержку
     *  если остановок не было
     *  если таймер обновляется слишком часто  
     *  если есть ошибка в интервалах
     *  если размер интервала не значителен
     */ 
    if (
      !this.stopTime                        ||
      this.rate < edge                      ||
      this.startTime > this.stopTime        ||
      this.startTime - this.stopTime < edge
    ) {
      return 0;
    }

    /**
     * Формула для расчета задержки старта 
     * timePassed - время с момента старта до повторного старта
     * waitingTime - 
     */
    let timePassed = (this.stopTime - this.startTime);
    let waitingTime = timePassed - this.rate * Math.floor(timePassed / this.rate);

    return this.rate - waitingTime;
  }

  /**
   * Запуск таймера
   */
  public start(): void
  {
    if (this.getIsActive()) {
      return;
    }

    let timerSelf = this;

    this.delayTimeoutTimer = setTimeout(function () { 
      // Сохраняем время запуска
      timerSelf.startTime = TimeHelper.getCurrentMicrotime();

      // Запускаем таймер выполнения
      timerSelf.timer = setInterval(timerSelf.callback, timerSelf.rate);

      // очищаем таймер задержки старта
      timerSelf.delayTimeoutTimer = null;
    }, this.calculateStartDelay());
  }

  /**
   * Остановка таймера
   */
  public stop(): void 
  {
    if (!this.getIsActive()) {
      return;
    }

    if (this.timer) {
      clearInterval(this.timer);
    }

    if (this.delayTimeoutTimer) {
      clearTimeout(this.delayTimeoutTimer);
    }
    
    this.timer = null;
    this.delayTimeoutTimer = null;
  }
}