import GameMap from "Engine/GameMap";
import GameObject from "Engine/Objects/GameObject";
import ObstacleObject from "Demos/RandomMoveDemo/ObstacleObject";
import Game from "Engine/Game";

export default class RandomMoveDemoMap extends GameMap
{
  public width = 550;
  public height = 650;

  public getMapObjects(game: Game): GameObject[]
  {
    let objectsArray: GameObject[] = [];

    let obstacleWidth = 150;

    for (let coord = obstacleWidth * 3; coord <= this.height - obstacleWidth * 3; coord += obstacleWidth) {     
      objectsArray.push(new ObstacleObject(game.generateObjectId(), {
        x: obstacleWidth * 3,
        y: coord,
        width: obstacleWidth,
        height: obstacleWidth,
      }));
    }
    
    return objectsArray;
  }
}