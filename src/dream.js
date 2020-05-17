import {data} from "./data";
import {addMarkerOnMap,visitDreamOnMap} from "./map";

const dreamsContainer = document.querySelector("#dreams-container");

function buildAllDreams() {
    // effacons tous les dreams pour eviter les doubles iterations
    while (dreamsContainer.lastChild) {
        dreamsContainer.removeChild(dreamsContainer.lastChild);
    }
    data.forEach(buildOneDream);
    addDreamsListeners();
}

// le forEach donne au parametre "dream" de buildOneDream chacun des objets du array data
function buildOneDream(dream) {
    const dreamElement = document.createElement("div");
    dreamElement.innerHTML = `
    <div class="card text-center" id="${dream.id}">
        <h4 class="card-header font-weight-bold">
            ${dream.description}
        </h4>
        <img src="${dream.imagePath}" class="card-img-top" alt="pilotis aux Maldives">
        <div class="card-body">
            <a href="#" class="button-action btn btn-${dream.done?"secondary":"danger"} btn-block font-weight-bold">${dream.done?"Je veux le refaire":"Je me lance !"}</a>
        </div>
        <div class="card-footer text-muted text-right">
            <a href="#" type="button" class="button-visit btn btn-outline-secondary btn-sm">Visiter</a>
            <a href="${dream.link}" target="_blank" type="button" class="btn btn-outline-dark btn-sm">Plus d'infos</a>
        </div>
    </div>
    `;
    dreamsContainer.appendChild(dreamElement);
    addMarkerOnMap(dream);  //prend un reve et ajoute son markeur
}


function addDreamsListeners(){
    document.querySelectorAll(".button-visit").forEach(item => {
        item.addEventListener("click", event => {
            // lancons la  fonction visitDream sur l'identifiant de notre bouton visiter
            visitDream(item.parentElement.parentElement.getAttribute("id"));
        });
    });

    document.querySelectorAll(".button-action").forEach(item => {
        item.addEventListener("click", event => {
            // lancons la  fonction visitDream sur l'identifiant de notre bouton visiter
            toggleDreamDone(item.parentElement.parentElement.getAttribute("id"));
        });
    });
}

function visitDream(dreamId){
    // la seule chose dont on a besoin pour visiter notre reve 
    //c'est juste la position de notre dream sur la map
    let position = data.filter( item => item.id == dreamId)[0].coordinates;
    visitDreamOnMap(position);
}

function toggleDreamDone(dreamId) {
    //on recupere un reve selon l'id
    let dream = data.filter( item => item.id == dreamId)[0];//elle renvoi une valeur du array data
    dream.done = !dream.done;
    //on raffraichi le map grace a buildAllDreams
    buildAllDreams();
}

export {buildAllDreams};
