import Tile from "Engine/Map/Tile";
import TileSetup from "Engine/DataStructures/Setups/TileSetup";
import TileWithDistance from "Engine/DataStructures/TileWithDistance";
import Point from "Engine/DataStructures/Point";

export default class Location
{
  // readonlys
  readonly tilesWidth: number;
  readonly tilesHeight: number;

  private _mapMatrix: Array<Array<Tile>>;

  public constructor() {
    this.tilesHeight = 5;
    this.tilesWidth = 5;

    this._mapMatrix = new Array<Array<Tile>>();
    
    for (let x = 0; x < this.tilesWidth; x++) {
      this._mapMatrix[x] = new Array<Tile>();

      for (let y = 0; y < this.tilesHeight; y++) {
        let setup = new TileSetup();
        setup.matrixPosition = new Point(x, y);
          
        this._mapMatrix[x][y] = new Tile(setup);
      }
    }

    console.log(this._mapMatrix);
  }

  public getTilesInRadius(matrixPoint: Point, radius: number, includeCenterTile: boolean = false): Array<TileWithDistance> {
    let tilesFound = new Array<TileWithDistance>();

    // координатная сетка увеличивается влево по Х и ВНИЗ!! по Y.
    // из-за этого так расчитывается граница по Y
    let xRight  = matrixPoint.x + radius >= this.tilesWidth ? this.tilesWidth - 1 : matrixPoint.x + radius;
    let xLeft   = matrixPoint.x - radius < 0 ? 0 : matrixPoint.x - radius;
    
    let yTop    = matrixPoint.y - radius < 0 ? 0 : matrixPoint.y - radius;
    let yBottom = matrixPoint.y + radius >= this.tilesHeight ? this.tilesHeight - 1 : matrixPoint.y + radius;
    
    if (!this._mapMatrix[matrixPoint.x][matrixPoint.y]) {
      return tilesFound;
    }

    // При поиске включаем точку "самого себя", если надо
    if (includeCenterTile) {
      tilesFound.push(new TileWithDistance(this._mapMatrix[matrixPoint.x][matrixPoint.y], 0));
    }

    if (radius < 1) {
      return tilesFound;
    }
    
    // Включаем "крест" по Y (ось Y инвертирована)
    for (let y = yTop; y <= yBottom ; y++) {
      if (y !== matrixPoint.y) {
        tilesFound.push(
          new TileWithDistance(
            this._mapMatrix[matrixPoint.x][y],
            matrixPoint.getDistanceToCoords(matrixPoint.x, y)
          )
        );
      }
    }

    // Включаем "крест" по X
    for (let x = xLeft; x <= xRight; x++) {
      if (x !== matrixPoint.x) {
        tilesFound.push(
          new TileWithDistance(
            this._mapMatrix[x][matrixPoint.y],
            matrixPoint.getDistanceToCoords(x, matrixPoint.y)
          )
        );
      }      
    }

    //Включаем недовключенные зоны
    let zones = [
      [[xLeft, yTop], [matrixPoint.x - 1, matrixPoint.y - 1]],
      [[matrixPoint.x + 1, yTop], [xRight, matrixPoint.y - 1]],
      [[xLeft, matrixPoint.y + 1], [matrixPoint.x - 1, yBottom]],
      [[matrixPoint.x + 1, matrixPoint.y + 1], [xRight, yBottom]],
    ];

    for (let zone of zones) {
      let zoneLeftTop = zone[0];
      let zoneRightBottom = zone[1];

      for (let zoneX = zoneLeftTop[0]; zoneX <= zoneRightBottom[0]; zoneX++) {
        for (let zoneY = zoneLeftTop[1]; zoneY <= zoneRightBottom[1]; zoneY++) {
          let distance = matrixPoint.getDistanceToCoords(zoneX, zoneY);

          if (distance <= radius) {
            tilesFound.push(
              new TileWithDistance(
                this._mapMatrix[zoneX][zoneY],
                distance
              )
            );
          }
        }
      }
    }

    // сортируем результат, чтобы самые близкие были к началу
    tilesFound.sort((a, b) => a.distance < b.distance ? -1 : a.distance > b.distance ? 1 : 0);

    return tilesFound;
  }
}