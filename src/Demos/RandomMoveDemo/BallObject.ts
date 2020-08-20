import GameObject from "Engine/Objects/GameObject";

export default class BallObject extends GameObject
{
  public getViewClass()
  {
    return 'ball';
  }
}