import GameMap from "Engine/GameMap";
import GameObject from "Engine/Objects/GameObject";
import ObstacleObject from "Demos/RandomMoveDemo/ObstacleObject";
import Game from "Engine/Game";
import BallObject from "./BallObject";
import MoveInDirectionOrder from "./MoveInDirectionOrder";
import MoveDirections from "Engine/Enums/MoveDirections";
import RandomMoveOrder from "./RandomMoveOrder";

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

    let moveSpeed = 35;

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
      defaultMoveSpeed: moveSpeed
    });
    let ball1MoveOrder = new MoveInDirectionOrder(MoveDirections.right);
    let ball1RandMove = new RandomMoveOrder(MoveDirections.right);
    ball1.addOrder(ball1MoveOrder);
    ball1.addOrder(ball1RandMove);

    let ball2 = new BallObject(game.generateObjectId(), {
      x: 500,
      y: 25,
      width: obstacleSide,
      height: obstacleSide,
      defaultMoveSpeed: moveSpeed
    });
    let ball2MoveOrder = new MoveInDirectionOrder(MoveDirections.left);
    let ball2RandMove = new RandomMoveOrder(MoveDirections.left);
    ball2.addOrder(ball2MoveOrder);
    ball2.addOrder(ball2RandMove);


    let ball3 = new BallObject(game.generateObjectId(), {
      x: 200,
      y: 250,
      width: obstacleSide,
      height: obstacleSide,
      defaultMoveSpeed: moveSpeed
    });
    let ball3MoveOrder = new MoveInDirectionOrder(MoveDirections.right);
    let ball3RandMove = new RandomMoveOrder(MoveDirections.right);
    ball3.addOrder(ball3MoveOrder);
    ball3.addOrder(ball3RandMove);

    let ball4 = new BallObject(game.generateObjectId(), {
      x: 500,
      y: 250,
      width: obstacleSide,
      height: obstacleSide,
      defaultMoveSpeed: moveSpeed
    });
    let ball4MoveOrder = new MoveInDirectionOrder(MoveDirections.left);
    let ball4RandMove = new RandomMoveOrder(MoveDirections.left);
    ball4.addOrder(ball4MoveOrder);
    ball4.addOrder(ball4RandMove);


    let ball5 = new BallObject(game.generateObjectId(), {
      x: 200,
      y: 500,
      width: obstacleSide,
      height: obstacleSide,
      defaultMoveSpeed: moveSpeed
    });
    let ball5MoveOrder = new MoveInDirectionOrder(MoveDirections.right);
    let ball5RandMove = new RandomMoveOrder(MoveDirections.right);
    ball5.addOrder(ball5MoveOrder);
    ball5.addOrder(ball5RandMove);

    let ball6 = new BallObject(game.generateObjectId(), {
      x: 500,
      y: 500,
      width: obstacleSide,
      height: obstacleSide,
      defaultMoveSpeed: moveSpeed
    });
    let ball6MoveOrder = new MoveInDirectionOrder(MoveDirections.left);
    let ball6RandMove = new RandomMoveOrder(MoveDirections.left);
    ball6.addOrder(ball6MoveOrder);
    ball6.addOrder(ball6RandMove);

    let ballSideL1 = new BallObject(game.generateObjectId(), {
      x: 25,
      y: 100,
      width: obstacleSide,
      height: obstacleSide,
      defaultMoveSpeed: moveSpeed
    });
    let ballSideL1MoveOrder = new MoveInDirectionOrder(MoveDirections.up);
    let ballSideL1RandMove = new RandomMoveOrder(MoveDirections.up);
    ballSideL1.addOrder(ballSideL1MoveOrder);
    ballSideL1.addOrder(ballSideL1RandMove);

    let ballSideL2 = new BallObject(game.generateObjectId(), {
      x: 25,
      y: 400,
      width: obstacleSide,
      height: obstacleSide,
      defaultMoveSpeed: moveSpeed
    });
    let ballSideL2MoveOrder = new MoveInDirectionOrder(MoveDirections.down);
    let ballSideL2RandMove = new RandomMoveOrder(MoveDirections.down);
    ballSideL2.addOrder(ballSideL2MoveOrder);
    ballSideL2.addOrder(ballSideL2RandMove);

    let ballSideR1 = new BallObject(game.generateObjectId(), {
      x: 675,
      y: 100,
      width: obstacleSide,
      height: obstacleSide,
      defaultMoveSpeed: moveSpeed
    });
    let ballSideR1MoveOrder = new MoveInDirectionOrder(MoveDirections.up);
    let ballSideR1RandMove = new RandomMoveOrder(MoveDirections.up);
    ballSideR1.addOrder(ballSideR1MoveOrder);
    ballSideR1.addOrder(ballSideR1RandMove);

    let ballSideR2 = new BallObject(game.generateObjectId(), {
      x: 675,
      y: 400,
      width: obstacleSide,
      height: obstacleSide,
      defaultMoveSpeed: moveSpeed
    });
    let ballSideR2MoveOrder = new MoveInDirectionOrder(MoveDirections.down);
    let ballSideR2RandMove = new RandomMoveOrder(MoveDirections.down);
    ballSideR2.addOrder(ballSideR2MoveOrder);
    ballSideR2.addOrder(ballSideR2RandMove);

    objectsArray.push(ball1);
    objectsArray.push(ball2);
    objectsArray.push(ball3);
    objectsArray.push(ball4);
    objectsArray.push(ball5);
    objectsArray.push(ball6);
    objectsArray.push(ballSideL1);
    objectsArray.push(ballSideL2);
    objectsArray.push(ballSideR1);
    objectsArray.push(ballSideR2);

    return objectsArray;
  }
}