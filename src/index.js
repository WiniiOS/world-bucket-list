import "babel-polyfill";
import {initMap} from './map';
import {buildAllDreams} from "./dream";

function init() {
    initMap();
    buildAllDreams();
}

// on ajoute l'init function au scope global
window.init = init;
