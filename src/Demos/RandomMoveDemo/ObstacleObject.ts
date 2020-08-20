import GameObject from "Engine/Objects/GameObject";

export default class ObstacleObject extends GameObject
{
  public getViewClass()
  {
    return 'obstacle';
  }
}