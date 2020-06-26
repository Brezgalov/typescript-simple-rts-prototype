import Point from "Engine/DataStructures/Point";
import DisplayedEntitySetup from "Engine/DataStructures/Setups/DisplayedEntitySetup";

export default class DisplayedEntity
{
  readonly id: string;

  private matrixPosition: Point;
  private displayPosition: Point;  

  // constructor

  public constructor(setup: DisplayedEntitySetup = null) {
    this.id = (Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase();

    if (!setup) {
      return;
    }

    this.matrixPosition = setup.matrixPosition;
    this.displayPosition = setup.displayPosition;
  }

  // getters

  public getMatrixPosition() {
    return this.matrixPosition;
  }

  public getDisplayPosition() {
    return this.displayPosition;
  }
}