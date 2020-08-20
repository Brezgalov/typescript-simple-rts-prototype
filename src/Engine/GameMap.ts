import GameObject from "./Objects/GameObject";
import CollisionHelper2D from "./Helpers/CollisionHelper2D";
import Game from "./Game";

export default class GameMap
{
  /**
   * Ширина
   */
  public width: number;

  /**
   * Высота
   */
  public height: number;

  /**
   * Объект внутри карты целиком
   * @param gameObject 
   */
  public gameObjectIsOnMap(gameObject: GameObject)
  {
    return this.sectorIsOnMap(
      gameObject.getX(),
      gameObject.getY(),
      gameObject.getWidth(),
      gameObject.getHeight()
    );
  }

  /**
   * Проверка, что сектор находится на карте целиком
   * @param x 
   * @param y 
   * @param width 
   * @param height 
   */
  public sectorIsOnMap(x: number, y:number, width:number, height: number): boolean
  {
    return (
      // Выход за границу справа
      (x + width <= this.width) &&
      // Выход за границу слева
      (x >= 0) && 
      // Выход за границу снизу
      (y >= 0) &&
      // Выход за границу сверху
      (y + height <= this.height)
    );
  }

  /**
   * Корректирует скорость движения по ландшафту
   * 
   * @param gameObject 
   * @param moveByX 
   * @param moveByY 
   */
  public getLandscapeMoveBy(gameObject: GameObject, moveByX: number, moveByY: number)
  {
    // координата объекта - левый верхний угол, поэтому надо подправить границы
    let mapEdgeRight = this.width - gameObject.getWidth();
    let mapEdgeTop = this.height - gameObject.getHeight();
    
    // снижаем скорость, если впереди край
    moveByX = CollisionHelper2D.getPossibleMoveByEdge(gameObject.getX(), moveByX, mapEdgeRight);
    moveByY = CollisionHelper2D.getPossibleMoveByEdge(gameObject.getY(), moveByY, mapEdgeTop);

    // если впереди прпятствие????

    return {
      moveByX: moveByX,
      moveByY: moveByY
    }
  }

  /**
   * Возвращает список объектов находящихся на карте по дефолту
   */
  public getMapObjects(game: Game) : GameObject[]
  {
    return [];
  }

  /**
   * Подгружает настройки карты
   * @param game 
   */
  public load(game: Game)
  {
    for (let gameObject of this.getMapObjects(game)) {
      game.registerObject(gameObject);
    }
  }
}