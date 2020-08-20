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

    let objectsRendered = new Map<number, boolean>();

    let $ = require("jquery");

    let mapElement = $('#' + game.mapHtmlId);
    mapElement.css({
      width: game.map.width + 'px',
      height: game.map.height + 'px'
    })

    this.timer = setInterval(function () {
      var objects = game.getObjects();

      for (let gameObject of objects) {
        if (!objectsRendered.has(gameObject.getId())) {
          mapElement.append(gameObject.getHtmlView());

          objectsRendered.set(gameObject.getId(), $('#'+gameObject.getId()));
        }

        gameObject.updateViewState(
          objectsRendered.get(gameObject.getId())
        )
      }
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