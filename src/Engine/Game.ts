import GameObject from "Engine/Objects/GameObject";
import GameMap from "Engine/GameMap";
import GameRender from "./GameRender";

export default class Game
{
  /**
   * Частота обновления таймера разбора приказов
   */
  readonly ordersHandlingRate = 100;

  /**
   * Таймер выполнения приказов
   */
  protected handleOrdersTimer: any;

  /**
   * Модуль рендера
   */
  protected render: GameRender;

  /**
   * ассоциативный массив объектов вида {id: объект}
   */
  protected objects: Map<number, GameObject> = new Map<number, GameObject>();

  /**
   * Карта. Содержит информацию о размерах и ландшафте
   */
  public map: GameMap;

  /**
   * constructor
   * @param map 
   */
  public constructor(map: GameMap)
  {
    this.map = map;
  }

  /**
   * Cписок зарегистрированных объектов
   */
  public getObjects()
  {
    return this.objects.values();
  }

  /**
   * Регистрируем объект в памяти игры
   * @param gameObject 
   */
  public registerObject(gameObject: GameObject)
  {
    this.objects.set(gameObject.getId(), gameObject);
  }

  /**
   * Проверяем возможность перемещения объекта в точку и перемещаем, если возможно
   * Если движение в эту точку не возможно - возвращаем false
   * @param id 
   * @param x 
   * @param y 
   */
  public moveObjectBy(gameObject: GameObject, speedX: number, speedY: number): boolean
  {
    let nextX = gameObject.getX() + speedX;
    let nextY = gameObject.getY() + speedY;

    if (!this.map.sectorIsOnMap(nextX, nextY, gameObject.getWidth(), gameObject.getHeight())) {
      return false;
    } 

    let closestCollisionX: number = null;
    let closestCollisionY: number = null;
 
    // Находим ближайшие точки коллизии
    // Т.к. дальнейшее движение при коллизии не возможно 
    // Мы максимально пододвинем объект к колизии
    for (let anotherGameObject of this.objects.values()) {
      let collisionOccures =
        anotherGameObject.getId() != gameObject.getId() &&
        anotherGameObject.hasCrossWithSector(nextX, nextY, gameObject.getWidth(), gameObject.getHeight());

      if (collisionOccures) {
        // Запоминаем ближайшую коллизию по оси
        
        // Если мы приближаемся к объекту слева, новая координата = его координната - наша ширина
        // Если мы приближаемся к объекту справа, новая координата = его координата + его ширина

        if (!closestCollisionX || closestCollisionX < anotherGameObject.getX()) {   
          if (speedX > 0) {
            closestCollisionX = anotherGameObject.getX() - gameObject.getWidth();
          } else if (speedX < 0) {
            closestCollisionX = anotherGameObject.getX() + anotherGameObject.getWidth();
          }
        }

        // Если мы приближаемся к объекту снизу, новая координата = его координната - наша высота
        // Если мы приближаемся к объекту сверху, новая координата = его координата + его высота

        if (!closestCollisionY || closestCollisionY < anotherGameObject.getY()) {
          if (speedY > 0) {
            closestCollisionY = anotherGameObject.getY() - gameObject.getHeight();
          } else if (speedY < 0) {
            closestCollisionY = anotherGameObject.getY() + anotherGameObject.getHeight();
          }
        }
      }
    }

    // Применяем результат колизии к координатам
    let hasCollision = false;
    if (closestCollisionX !== null) {
      hasCollision = true;
      nextX = closestCollisionX;
    } 
    if (closestCollisionY !== null) {
      hasCollision = true;
      nextY = closestCollisionY;
    }

    gameObject.setX(nextX);
    gameObject.setY(nextY);
    
    console.log('object ' + gameObject.getId() + ' moved to:', { x: gameObject.getX(), y: gameObject.getY() });
    
    return !hasCollision; 
  }

  /**
   * Проверка, что объект можно передвинуть на указанные координаты
   * @param gameObject 
   * @param x 
   * @param y 
   */
  public objectHasCollisionAt(gameObject: GameObject, x: number, y: number)
  {
    // Проверка колизии с объектами
    for (let anotherGameObject of this.objects.values()) {
      if (
        anotherGameObject.getId() != gameObject.getId() &&
        anotherGameObject.hasCrossWithSector(x, y, gameObject.getWidth(), gameObject.getHeight())
      ) {
        return false;
      }
    }

    return true;
  }

  /**
   * Все объекты приступают к выполнению приказов
   */
  public handleOrders()
  {
    for (let gameObject of this.objects.values()) {
      gameObject.handleOrder(this);
    }
  }

  /**
   * Запускаем игру
   */
  public start()
  {
    let game = this;

    this.handleOrdersTimer = setInterval(function () { 
      game.handleOrders();
    }, this.ordersHandlingRate);

    this.render.start(game);
  }
}