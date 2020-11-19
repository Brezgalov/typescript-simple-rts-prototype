import BaseOrder from "Engine/Orders/BaseOrder";
import Game from "Engine/Game";

export default class GameObject
{
  /**
   * Идентификатор
   */
  protected id: number;

  /**
   * Координаты
   */
  protected x: number = 0;
  protected y: number = 0;

  /**
   * Ширина
   */
  protected width: number = 0;

  /**
   * Высота
   */
  protected height: number = 0;

  /**
   * Список команд
   */
  protected orders: Array<BaseOrder> = [];

  /**
   * Дефолтная скорость движения
   */
  protected defaultMoveSpeed: number = 0;

  /**
   * Конструктор
   * @param id 
   * @param setup - объект с настройками свойств
   */
  public constructor(id: number, setup: any = {})
  {
    this.id = id;

    if (setup) {
      this.setupProperties(setup, ['width', 'height', 'x', 'y', 'defaultMoveSpeed']);
    }
  }

  /**
   * Устанавливает свойства объекта динамически
   * @param setup 
   * @param props 
   */
  public setupProperties(setup: any, props: Array<string>)
  {
    for (let prop of props) {
      if (typeof setup[prop] != 'undefined') {
        this[prop as keyof GameObject] = setup[prop];
      }
    }
  }

  /**
   * Геттер ИД
   */
  public getId()
  {
    return this.id;
  }

  /**
   * Возвращает дефолтную скорость движения объекта
   */
  public getMoveSpeed()
  {
    return this.defaultMoveSpeed;
  }

  /**
   * Геттер х
   */
  public getX(): number
  {
    return this.x;
  }

  /**
   * Сеттер х
   * @param value 
   */
  public setX(value: number): void
  {
    this.x = value;
  }

  /**
   * Геттер у
   */
  public getY(): number
  {
    return this.y;
  }

  /**
   * Сеттер У
   * @param value 
   */
  public setY(value: number): void
  {
    this.y = value;
  }

  /**
   * Геттер ширины объекта
   */
  public getWidth()
  {
    return this.width;
  }

  /**
   * Геттер высоты объекта
   */
  public getHeight()
  {
    return this.height;
  }

  /**
   * Добавляем приказ в очередь
   * @param order 
   */
  public addOrder(order: BaseOrder): void
  {
    this.orders.push(order);
  }

  /**
   * Отправляем следующий приказ на обработку
   * @param game 
   */
  public handleOrder(game: Game): void
  {
    // убираем все выполненные приказы
    this.updateOrdersQueue();

    if (this.orders.length <= 0) {
      return;
    }

    this.orders[0].execute(this, game);
  }

  /**
   * Обновляем очередь приказов убирая лишние
   */
  public updateOrdersQueue(): void
  {  
    while (this.orders.length > 0 && this.orders[0].getIsDone()) {
      this.orders.splice(0, 1);
    }
  }

  /**
   * Очищаем список приказов
   */
  public dropOrders(): void
  {
    if (this.orders.length > 0) {
      this.orders[0].stopProcessing();
    }

    delete (this.orders);

    this.orders = [];
  }

  /**
   * Проверка колизии с другим объектом
   * @param gameObject 
   */
  public hasCollisionWith(gameObject: GameObject)
  {
    return this.hasCrossWithSector(
      gameObject.getX(),
      gameObject.getY(),
      gameObject.getWidth(),
      gameObject.getHeight()
    );
  }

  /**
   * Проверка нахождения внутри сектора хотя бы частично
   * @param x 
   * @param y 
   * @param width 
   * @param height 
   */
  public hasCrossWithSector(x: number, y: number, width: number, height: number)
  {
    // Проще проверить, что сектора не пересекаются и инвертировать результат
    // !(
      // Мы либо правее либо левее по Х - тогда нет пересечения
      // либо
      // Мы либо выше либо ниже по Y - тогда нет пересечения
    //)
    return !(
      (x + width <= this.x) || (x >= this.x + this.width) ||
      (y + height <= this.y) || (y >= this.y + this.height)
    );
  }

  /**
   * Возвращает базовое html представление объекта
   */
  public getHtmlView()
  {
    return '<div id=' + this.getId() + '></div>';  
  }

  /**
   * Возвращает текущий класс соответствующих html представлению объекта
   */
  public getViewClass()
  {
    return 'gameObject';
  }

  /**
   * Обновляет состояние $(html) представления объекта
   * @param element 
   */
  public updateViewState(element: any)
  {
    return element.css({
      'left': this.getX() + 'px',
      'top': this.getY() + 'px',
      'width': this.getWidth() + 'px',
      'height': this.getHeight() + 'px'
    }).addClass(this.getViewClass());
  }
}