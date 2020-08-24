import MoveOrder from "Engine/Orders/MoveOrder";
import Game from "Engine/Game";
import GameObject from "Engine/Objects/GameObject";
import MoveDirections from "Engine/Enums/MoveDirections";

export default class MoveInDirectionOrder extends MoveOrder
{
  /**
   * Направление движения
   */
  public direction: MoveDirections;

  /**
   * Constructor
   * @param direction 
   */
  public constructor(direction: MoveDirections)
  {
    super();
    this.direction = direction;
   }

  /**
   * Условие остановки
   * @param gameObject 
   * @param game 
   */
  protected isDoneCondition(gameObject: GameObject, game: Game)
  {
    return this.isDone || this.isBlocked;
  }

  /**
   * Стартовая скорость X
   */
  protected getDefaultSpeedX()
  {
    let pointsToMove = this.getSpeedPointsPerTick();

    if (this.direction === MoveDirections.right) {
      return pointsToMove;
    }

    if (this.direction === MoveDirections.left) {
      return -1 * pointsToMove;
    }

    return 0;
  }

  /**
   * Стартовая скорость Y
   */
  protected getDefaultSpeedY()
  {
    let pointsToMove = this.getSpeedPointsPerTick();
    
    if (this.direction === MoveDirections.up) {
      return pointsToMove;
    }

    if (this.direction === MoveDirections.down) {
      return -1 * pointsToMove;
    }

    return 0;
  }

  /**
   * При движении до упора точки прибытия нет - не к чему фиксить
   * @param toX 
   * @param speed 
   */
  protected fixSpeedToDestinationByX(toX: number, speed: number)
  {
    return speed;
  }

  /**
   * При движении до упора точки прибытия нет - не к чему фиксить
   * @param toY
   * @param speed 
   */
  protected fixSpeedToDestinationByY(toY: number, speed: number)
  {
    return speed;
  }
}