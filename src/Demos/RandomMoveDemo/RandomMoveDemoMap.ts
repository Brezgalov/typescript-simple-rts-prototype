import GameMap from "Engine/GameMap";
import GameObject from "Engine/Objects/GameObject";
import ObstacleObject from "Demos/RandomMoveDemo/ObstacleObject";
import Game from "Engine/Game";
import BallObject from "./BallObject";
import MoveInDirectionOrder from "./MoveInDirectionOrder";
import MoveDirections from "Engine/Enums/MoveDirections";

export default class RandomMoveDemoMap extends GameMap
{
  public width = 750;
  public height = 600;

  public getMapObjects(game: Game): GameObject[]
  {
    let objectsArray: GameObject[] = [];

    let obstacleSide = 50;

    let horizontalCoordBottom = obstacleSide * 2;
    let verticalPlankCoord = obstacleSide * (2 + 5);
    let horizontalCoordTop = this.height - obstacleSide * (3 + 1);

    for (let coord = obstacleSide * 2; coord <= this.width - obstacleSide * (2 + 1); coord += obstacleSide) {     
      objectsArray.push(new ObstacleObject(game.generateObjectId(), {
        x: coord,
        y: horizontalCoordBottom,
        width: obstacleSide,
        height: obstacleSide,
      }));

      objectsArray.push(new ObstacleObject(game.generateObjectId(), {
        x: coord,
        y: horizontalCoordTop,
        width: obstacleSide,
        height: obstacleSide,
      }));
    }
    
    for (let coord = obstacleSide * (2 + 1); coord <= this.height - obstacleSide * (2 + 2); coord += obstacleSide) {
      objectsArray.push(new ObstacleObject(game.generateObjectId(), {
        x: verticalPlankCoord,
        y: coord,
        width: obstacleSide,
        height: obstacleSide,
      }));
    }

    let ball1 = new BallObject(game.generateObjectId(), {
      x: 200,
      y: 25,
      width: obstacleSide,
      height: obstacleSide,
      defaultMoveSpeed: 15
    });
    let ball1MoveOrder = new MoveInDirectionOrder(MoveDirections.right);
    ball1.addOrder(ball1MoveOrder);

    let ball2 = new BallObject(game.generateObjectId(), {
      x: 500,
      y: 25,
      width: obstacleSide,
      height: obstacleSide,
      defaultMoveSpeed: 15
    });
    let ball2MoveOrder = new MoveInDirectionOrder(MoveDirections.left);
    ball2.addOrder(ball2MoveOrder);


    let ball3 = new BallObject(game.generateObjectId(), {
      x: 200,
      y: 250,
      width: obstacleSide,
      height: obstacleSide,
      defaultMoveSpeed: 15
    });
    let ball3MoveOrder = new MoveInDirectionOrder(MoveDirections.right);
    ball3.addOrder(ball3MoveOrder);

    let ball4 = new BallObject(game.generateObjectId(), {
      x: 500,
      y: 250,
      width: obstacleSide,
      height: obstacleSide,
      defaultMoveSpeed: 15
    });
    let ball4MoveOrder = new MoveInDirectionOrder(MoveDirections.left);
    ball4.addOrder(ball4MoveOrder);


    let ball5 = new BallObject(game.generateObjectId(), {
      x: 200,
      y: 500,
      width: obstacleSide,
      height: obstacleSide,
      defaultMoveSpeed: 15
    });
    let ball5MoveOrder = new MoveInDirectionOrder(MoveDirections.right);
    ball5.addOrder(ball5MoveOrder);

    let ball6 = new BallObject(game.generateObjectId(), {
      x: 500,
      y: 500,
      width: obstacleSide,
      height: obstacleSide,
      defaultMoveSpeed: 15
    });
    let ball6MoveOrder = new MoveInDirectionOrder(MoveDirections.left);
    ball6.addOrder(ball6MoveOrder);

    objectsArray.push(ball1);
    objectsArray.push(ball2);
    objectsArray.push(ball3);
    objectsArray.push(ball4);
    objectsArray.push(ball5);
    objectsArray.push(ball6);
    
    return objectsArray;
  }
}