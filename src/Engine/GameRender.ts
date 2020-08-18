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

    /**
     * Разыменование для входа в таймер
     */
    let render = this;

    this.timer = setInterval(function () {
      var objects = game.getObjects();

    }, 1000 / this.fpsDefault);
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