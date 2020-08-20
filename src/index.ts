import './styles/style.scss';
import MoveDemo from 'Demos/MoveDemo/MoveDemo';
import AbstractDemo from "Demos/AbstractDemo";
import RandomMoveDemo from 'Demos/RandomMoveDemo/RandomMoveDemo';

let demos = new Map<string, AbstractDemo>(); 

demos.set('MoveDemo', new MoveDemo());
demos.set('RandomMoveDemo', new RandomMoveDemo());


let demoToRun = 'RandomMoveDemo';

console.log('run ' + demoToRun);

let demo = demos.get(demoToRun);
demo.run();

// import Location from "Engine/Map/Location";
// import Point from "Engine/DataStructures/Point";
// import Render from "Engine/Render";



// let div = document.getElementById("mydiv");
// console.log(div);

// div.setAttribute("style", "color:red; border: 1px solid blue;");

// console.log($('#gamescreen').css({'border-color': 'red'}));

// let testLoc = new Location();
// let found = testLoc.getTilesInRadius(new Point(1, 1), 2, true);

// console.log('map', testLoc);
// console.log('found', found);

// Render.renderLocation(testLoc);

// div.setAttribute('style', 'margin-top: 50px');