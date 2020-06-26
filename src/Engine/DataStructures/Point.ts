export default class Point
{
  public x: number;
  public y: number;

  public constructor(x: number = 0, y: number = 0) {
    this.x = x;
    this.y = y;
  }

  public getDistanceTo(nextPoint: Point): number {
    return this.getDistanceToCoords(nextPoint.x, nextPoint.y);
  }

  public getDistanceToCoords(x:number, y:number): number {
    return Math.sqrt(
      Math.pow(x - this.x, 2) +
      Math.pow(y - this.y, 2)
    );
  }
}