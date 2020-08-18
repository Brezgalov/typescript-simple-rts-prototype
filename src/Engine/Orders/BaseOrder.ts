import GameObject from "Engine/Objects/GameObject";
import Game from "Engine/Game";

export default abstract class BaseOrder 
{
  protected isDone: boolean = false;
  
  protected isStopped: boolean = false;

  protected isStarted: boolean = false;

  /**
   * Геттер свойства "приказ выполнен"
   */
  public getIsDone(): boolean
  {
    return this.isDone;
  }

  /**
   * Геттер свойства "приказ выполняется"
   */
  public getIsStarted(): boolean
  {
    return this.isStarted;
  }

  /**
   * Остановка выполнения приказа
   */
  public stopProcessing()
  {
    this.isStopped = true;
  }

  /** 
   * Соединяем применение приказа и проверку выполнения
   */
  public execute(gameObject: GameObject, game: Game)
  {
    if (this.isDone) {
      return;
    }
    
    this.isStarted = true;

    this.applyToObject(gameObject, game);

    this.isDone = this.checkIsDone(gameObject, game);

    return this.isDone;
  }

  /**
   * Проверяем, выполнен ли приказ
   * 
   * @param gameObject 
   * @param game 
   */
  protected abstract checkIsDone(gameObject: GameObject, game: Game): boolean;

  /**
   * Применяем приказ к объекту
   * 
   * @param gameObject 
   * @param game 
   */
  protected abstract applyToObject(gameObject: GameObject, game: Game): void;
}