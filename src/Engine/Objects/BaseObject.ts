import DisplayedEntity from "Engine/Map/DisplayedEntity";

export default class BaseObject extends DisplayedEntity
{
  // readonly
  readonly isDesctutable: boolean = false;
  readonly isMovable: boolean = false;
  readonly isObstacle: boolean = false;

  readonly zIndex: number = 0;

  readonly team: string = 'default';

  constructor() {
    super();
  }
}