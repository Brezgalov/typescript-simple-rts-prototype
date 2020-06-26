import BaseObject from 'Engine/Objects/BaseObject';

export default class BaseUnit extends BaseObject
{
  private _currentOrder: number = 0;

  public getCurrentOrder(): number
  {
    return this._currentOrder;
  }
}