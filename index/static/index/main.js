// Hacemos el llamado del mapa para Imprimirlo en pantalla
var map = L.map("map").setView([9.938754825564125, -75.15197753906251], 9);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

//Pintamos las Lineas delimitadoras del departamento de bolivar
var poligon = L.polygon(LatIng, { color: "blue" }).addTo(map);

//Aplicamos la busqueda de las zonas por medio de las cordenas tomando en cuenta el valor ingresado en el Input
function searchPlant() {
  const plantName = document.getElementById('plant-search').value;
  fetch(`/plant-location/?plant_name=${plantName}`)
    .then(response => response.json())
    .then(data => {
      if (data.plant_location) {
        console.log(`Location: ${data.plant_location}`);
        const [lat, lng] = data.plant_location.split(',').map(Number);
        map.flyTo([lat, lng], 14);
        L.marker([lat, lng]).addTo(map)
          .bindPopup(`<b>${plantName}</b><br />Ubicación encontrada.`)
          .openPopup();
      } else {
        console.error('Planta no encontrada');
      }
    })
    .catch(error => console.error('Error:', error));
}

// Añadir un evento de clic al mapa
map.on("click", function (e) {
  // Obtener las coordenadas donde se hizo clic
  var lat = e.latlng.lat;
  var lng = e.latlng.lng;

  // Imprimir las coordenadas en la consola
  console.log(lat + "," + lng);
});
