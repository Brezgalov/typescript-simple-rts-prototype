import Game from "Engine/Game";
import GameTimer from "./GameTimer";

export default class GameRender
{
  readonly fpsDefault = 15;

  /**
   * Таймер рендера
   */
  protected timer: GameTimer;

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
    if (this.timer && this.timer.getIsActive()) {
      return;
    }

    let objectsRendered = new Map<number, boolean>();

    let $ = require("jquery");

    let mapElement = $('#' + game.mapHtmlId);
    mapElement.css({
      width: game.map.width + 'px',
      height: game.map.height + 'px'
    })

    this.timer = new GameTimer(function () {
      let objects = game.getObjects();

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

    game.registerGameTimer(this.timer, 'GameRendererTimer');
  }
}