import MoveInDirectionOrder from "Demos/RandomMoveDemo/MoveInDirectionOrder";
import MoveDirections from "Engine/Enums/MoveDirections";
import BaseOrder from "Engine/Orders/BaseOrder";
import GameObject from "Engine/Objects/GameObject";
import Game from "Engine/Game";
import MathHelper from "Engine/Helpers/MathHelper";

export default class RandomMoveOrder extends BaseOrder
{
  /**
   * Флаг, что все приказы выданны
   */
  protected ordersGiven: boolean = false;

  /**
   * Предыдущее направление - определяет куда нельзя двигаться дальше
   */
  protected previousDirection: MoveDirections;

  /**
   * Конструктор
   * @param previousDirection 
   */
  public constructor(previousDirection: MoveDirections)
  {
    super();
    this.previousDirection = previousDirection;
  }

  /**
   * Проверяем, выполнен ли приказ
   * 
   * @param gameObject 
   * @param game 
   */
  public checkIsDone(gameObject: GameObject, game: Game)
  {
    return this.ordersGiven;
  }

  /**
   * Определяем куда двигаться дальше
   */
  protected calculateNextDirection(): MoveDirections
  {
    let directions = [
      MoveDirections.left,
      MoveDirections.right,
      MoveDirections.up,
      MoveDirections.down
    ];

    let indexToDrop = directions.indexOf(this.previousDirection);
    if (indexToDrop !== -1) {
      directions.splice(indexToDrop, 1);
    }
    
    let indexToTake = MathHelper.randomInt(0, directions.length - 1);
    
    return directions[indexToTake];
  }

  /**
   * Применение приказа
   * @param gameObject 
   * @param game 
   */
  protected applyToObject(gameObject: GameObject, game: Game)
  {
    if (this.ordersGiven) {
      return;
    }

    let nextDirrection = this.calculateNextDirection();
    
    gameObject.addOrder(new MoveInDirectionOrder(nextDirrection));
    gameObject.addOrder(new RandomMoveOrder(nextDirrection));

    this.ordersGiven = true;
  }
}