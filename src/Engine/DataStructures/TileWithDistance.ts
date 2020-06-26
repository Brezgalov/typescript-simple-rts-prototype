import Tile from "Engine/Map/Tile";

export default class TileWithDistance
{
  public tile: Tile;
  public distance: number;

  public constructor(tile: Tile, distance: number) {
    this.tile = tile;
    this.distance = distance;
  }
}