import GameMap from "Engine/GameMap";
import Game from "Engine/Game";
import GameObject from "Engine/Objects/GameObject";
import MoveOrder from "Engine/Orders/MoveOrder";

export default class MoveDemo 
{
  //public mapSelector: string;

  public run()
  {
    let map = new GameMap();
    map.width = 150;
    map.height = 100;

    let game = new Game(map);

    let testObject = new GameObject(1, { x: 3, y: 27, width: 50, height: 50 });
    let testObjectObstacle = new GameObject(2, { x: 100, y: 0, width: 50, height: 50 });
    
    game.registerObject(testObject);
    game.registerObject(testObjectObstacle);

    console.log('start');
    game.start();

    let moveOrder = new MoveOrder();
    moveOrder.tickRate = 1000;
    moveOrder.speed = 10;

    // Превышает, должен встать четко в 0
    moveOrder.toX = 144; 

    // Не соответствует скорости движения, объект все равно должен достичь
    moveOrder.toY = 2;  

    console.log('order added');
    testObject.addOrder(moveOrder);
  }
}