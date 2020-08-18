export default class CollisionHelper2D
{
  /**
  * Принимает требуемое смещение объекта по одной оси
  * Возвращает возможное смещение
  * Предполагается, что position находится внутри 
  * 
  * @param position
  * @param moveBy 
  * @param maxCoord 
  * @param minCoord 
  */
  public static getPossibleMoveByEdge(position: number, moveBy: number, maxCoord: number, minCoord: number = 0)
  {
    let nextCoord = position + moveBy;

    if (nextCoord < minCoord && position >= minCoord) {
      return -1 * Math.abs(position - minCoord);
    } else if (nextCoord > maxCoord && position <= maxCoord) {
      return Math.abs(position - maxCoord);
    }

    return moveBy;
  }

  /**
   * Принимает на вход сдвиг до точки
   * Если расстояние до точки меньше сдвига - корректирует сдвиг
   * 
   * @param position 
   * @param moveBy 
   * @param destination 
   */
  public static getMoveByCoord(position: number, moveBy: number, destination: number)
  {
    let nextCoord = position + moveBy;

    if (moveBy > 0 && nextCoord > destination) {
      return Math.abs(destination - position);
    } else if (moveBy < 0 && nextCoord < destination) {
      return -1 * Math.abs(destination - position);
    }

    return moveBy;
  }
}