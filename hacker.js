let map;
async function initMap(pos) {
    // The location of Uluru
    let latitude = pos.coords.latitude;
    let longitude = pos.coords.longitude;  
    console.log(latitude);
    console.log(longitude); 
    const position = { lat: latitude, lng: longitude };
    // Request needed libraries.
    //@ts-ignore
    const { Map } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

    map = new Map(document.getElementById("map"), {
        zoom: 4,
        center: position,
        mapId: "DEMO_MAP_ID",
    });
    const marker = new AdvancedMarkerElement({
        map: map,
        position: position,
    });
};
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(initMap, showError);
  } else { 
    alert("Geolocation is not supported by this browser.");
  }
}

// function showPosition(position) {
//     let latitude = position.coords.latitude;
//     let longitude = position.coords.longitude;
//     return [position.coords.latitude, position.coords.longitude];
// }

function showError(error) {
  switch(error.code) {
    case error.PERMISSION_DENIED:
      alert("User denied the request for Geolocation.");
      break;
    case error.POSITION_UNAVAILABLE:
      alert("Location information is unavailable.");
      break;
    case error.TIMEOUT:
      alert("The request to get user location timed out.");
      break;
    case error.UNKNOWN_ERROR:
      alert("An unknown error occurred.");
      break;
  }
}