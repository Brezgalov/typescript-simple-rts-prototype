import './styles/style.scss';
import Location from "Engine/Map/Location";
import Point from "Engine/DataStructures/Point";

import $ = require("jquery");

let div = document.getElementById("mydiv");
console.log(div);

div.setAttribute("style", "color:red; border: 1px solid blue;");

console.log($('#gamescreen').css({'border-color': 'red'}));

let testLoc = new Location();
let found = testLoc.getTilesInRadius(new Point(1, 1), 2, true);

console.log('map', testLoc);
console.log('found', found);