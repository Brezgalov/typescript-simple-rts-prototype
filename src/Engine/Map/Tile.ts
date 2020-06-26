import BaseUnit from "Engine/Objects/Units/BaseUnit";
import BaseStructure from "Engine/Objects/Structures/BaseStructure";
import DisplayedEntity from "Engine/Map/DisplayedEntity";

export default class Tile extends DisplayedEntity
{
  private _unit: BaseUnit;
  private _floor: BaseStructure;

  // getters

  public getUnit(): BaseUnit {
    return this._unit;
  }

  public getFloor(): BaseStructure {
    return this._floor;
  }

  // methods

  public canStepInto(unit: BaseUnit): boolean {
    return true;
  }

  public stepInto(unit: BaseUnit): boolean {
    if (!this.canStepInto(unit)) {
      return false;
    }

    this._unit = unit;
    return true;
  }

  public containsUnit(ofTeam: string = null) {
    if (this._unit == null) {
      return false;
    }

    // проверка на соответствие команде: 
    // либо команду не указала для проверки, либо указали и она совпала
    return !ofTeam || ofTeam && this._unit.team === ofTeam;
  }
}