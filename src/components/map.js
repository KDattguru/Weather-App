
let map;

function initMap() {
    // Coordinates for the center of the map
    const center = { lat: 37.7749, lng: -122.4194 };

    // Create a new map centered at the specified coordinates
    map = new google.maps.Map(document.getElementById("map"), {
        center: center,
        zoom: 12, // Adjust the zoom level as needed
    });

    // You can add markers, polygons, and other features to the map as required
    // Example: Add a marker
    const marker = new google.maps.Marker({
        position: center,
        map: map,
        title: "My Location",
    });
}