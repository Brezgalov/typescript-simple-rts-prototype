import AbstractDemo from "Demos/AbstractDemo";
import Game from "Engine/Game";
import RandomMoveDemoMap from "./RandomMoveDemoMap";

export default class RandomMoveDemo extends AbstractDemo
{
  public run()
  {
    let map = new RandomMoveDemoMap();

    let game = new Game(map);

    console.log('start');
    game.start();
  }
}