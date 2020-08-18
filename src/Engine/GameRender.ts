import Game from "Engine/Game";

export default class GameRender
{
  readonly fpsDefault = 15;

  /**
   * Таймер рендера
   */
  protected timer:any;

  /**
   * Для расчета частоты отрисовки
   */
  public fps: number = 15;

  /**
   * Запуск рендера
   * @param game 
   */
  public start(game: Game)
  {
    if (this.timer) {
      return;
    }

    let tickRate = 1000 / (this.fps ? this.fps : this.fpsDefault);

    this.timer = setInterval(function () {
      
    }, tickRate);
  }

  /**
   * Остановить отрисовку
   */
  public stop()
  {
    if (!this.timer) {
      return;
    }

    clearInterval(this.timer);
  }
}