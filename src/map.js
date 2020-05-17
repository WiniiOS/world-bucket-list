//tout ce qui a un rapport avec le map
const resetMapButton = document.querySelector("#reset-map"); 
const backToMapButton = document.querySelector("#back-to-map");
let map;
let panorama;
let panoramaElement = document.querySelector("#panorama");

function initMap() {
    map = new google.maps.Map(document.getElementById('map'),{
    center:{lat:48.858376,lng:2.294525},
    zoom:3,
    streetViewControl: false
    }); 

    panorama = new google.maps.StreetViewPanorama(
        document.getElementById('panorama'), {
          position:{lat:48.858376,lng:2.294525},
          pov: {
            heading: 34,
            pitch: 10
        }
    });
    map.setStreetView(panorama);

    addMapListeners();
    // cachons la street view pour voir la map de base
    panoramaElement.style.display = "none";
    backToMapButton.style.display = "none";

}

// le parametre dream est un objet detache du data par forEach()
function addMarkerOnMap(dream) {
    const marker = new google.maps.Marker({
        position:dream.coordinates,
        icon: dream.done ? "img/marker-done.png" : "img/marker.png",
        map:map
    });

    marker.addListener('click', function() {
        zoomOn(marker.getPosition());
      });
}

function addMapListeners() {
    resetMapButton.addEventListener("click",resetMap);
    backToMapButton.addEventListener("click",backToMap);
}

// on fait un zoom sur la position cliqué
function zoomOn(position) {
    map.setZoom(20);
    map.setCenter(position);
    map.setMapTypeId("satellite");
}

function resetMap() {
    map.setZoom(3);
    map.setCenter({lat:48.858376,lng:2.294525});
    map.setMapTypeId("roadmap");
}

function backToMap() {
    panoramaElement.style.display = "none";
    resetMapButton.style.display = "block";

}

function visitDreamOnMap(position) {
    panorama.setPosition(position);
    // la St view s'affiche only quand on clique sur le button
    panoramaElement.style.display = "block";
    backToMapButton.style.display = "block";
    resetMapButton.style.display = "none";
    
}
export {initMap,addMarkerOnMap,visitDreamOnMap};
