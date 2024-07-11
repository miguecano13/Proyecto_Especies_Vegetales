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
//Mas adelante se hara la busqueda asociandola con la base de datos
document
  .getElementById("select-location")
  .addEventListener("change", function (e) {
    let coords = e.target.value.split(",");
    if(e.target.value == "9.938754825564125, -75.15197753906251"){
        let init_coords = e.target.value.split(",");
        map.flyTo(init_coords, 9);
    }else{
        map.flyTo(coords, 14);
    } 
  });

// Añadir un evento de clic al mapa
map.on("click", function (e) {
  // Obtener las coordenadas donde se hizo clic
  var lat = e.latlng.lat;
  var lng = e.latlng.lng;

  // Imprimir las coordenadas en la consola
  console.log(lat + "," + lng);
});
