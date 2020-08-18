import BaseOrder from "Engine/Orders/BaseOrder";
import GameObject from "Engine/Objects/GameObject";
import Game from "Engine/Game";
import CollisionHelper2D from "Engine/Helpers/CollisionHelper2D";

export default class MoveOrder extends BaseOrder
{
  protected moveTimer: any;

  public speed: number = 1; // points per second

  public tickRate: number = 100;
  
  public toX: number = 0;
  
  public toY: number = 0;
  
  /**
   * Что-то блокирует проход
   */
  public isBlocked: boolean = false;

  /**
   * Определяем сколько надо пройти за 1 тик
   * х = ((this.speed / 1000) * tickRate) округляем до 2х знаков 
   * умножаем х на 100, отсекаем знаки после запятой и делим на 100 еще раз
   */
  public getSpeedPointsPerTick(): number
  {
    return Math.round(this.speed * this.tickRate / 10) / 100;
  }

  /**
   * Событие происходит при проверке готовности, если объект заблокирован
   * Тут можно будет разместить корректирование маршрута, 
   * если путь преградил другой объект
   * 
   * @param gameObject 
   * @param game 
   */
  public onBlocked(gameObject: GameObject, game: Game): void
  {
    
  }

  /**
   * Проверяем, что движение окончено или не возможно
   * @param gameObject 
   * @param game 
   */
  protected checkIsDone(gameObject: GameObject, game: Game): boolean
  {
    if (this.isBlocked) {
      this.onBlocked(gameObject, game);
    }

    let isDone = this.isBlocked || // Если движению что-то мешает - останавливаемся
      gameObject.getX() == this.toX && gameObject.getY() == this.toY;
    
    if (isDone) {
      this.stopTimer();
    }
    
    return isDone;
  }

  /**
   * Применяем приказ к объекту
   * @param gameObject 
   * @param game 
   */
  protected applyToObject(gameObject: GameObject, game: Game)
  {
    if (this.moveTimer) {
      return;
    }

    // разыменование для входа внутрь таймера
    let moveOrder = this;
    let pointsToMove = moveOrder.getSpeedPointsPerTick();

    let defaultSpeedX = this.toX > gameObject.getX() ? pointsToMove : -1 * pointsToMove;
    let defaultSpeedY = this.toY > gameObject.getY() ? pointsToMove : -1 * pointsToMove;

    this.moveTimer = setInterval(function () {
      // Нужно остановиться, если следующая точка превышает необходимую координату
      let speedX = CollisionHelper2D.getMoveByCoord(gameObject.getX(), defaultSpeedX, moveOrder.toX);
      let speedY = CollisionHelper2D.getMoveByCoord(gameObject.getY(), defaultSpeedY, moveOrder.toY);

      // Если точка находится за краем карты или препятствием карты
      // Объект не коснулся правым краем стены, но стоит очень близко
      // А скорость объекта больше расстояния до стены
      // - следующая точка будет за картой и moveObjectById == false. Нужно подправить скорость
      
      let speedData = game.map.getLandscapeMoveBy(gameObject, speedX, speedY);
      speedX = speedData.moveByX;
      speedY = speedData.moveByY;

      // Если скорость упала до 0, а мы еще не достигли точки
      // Значит движение дальше не возможно
      if (speedX == 0 && speedY == 0 && !this.isDone) {
        this.isBlocked = true;
        moveOrder.checkIsDone(gameObject, game);

        return;
      }
      
      // Если точка находится за краем карты или препятствием объектом - получим false
      // метод автоматом пододвинет нас к объекту
      let moveIsFree = game.moveObjectBy(
        gameObject,
        speedX,
        speedY
      );
      
      moveOrder.isBlocked = !moveIsFree;

      if (!moveOrder.isBlocked) {
        game.updateObjectsPositions();
      }     
      
      moveOrder.checkIsDone(gameObject, game);
    }, this.tickRate);
  }

  /**
   * Останавливаем таймер приказа
   */
  public stopTimer(): void
  {
    if (this.moveTimer) {
      clearInterval(this.moveTimer);
    } 
  }

  /**
   * Останавливаем выполнение приказа
   */
  public stopProcessing()
  {
    super.stopProcessing();
    this.stopTimer();
  }
}