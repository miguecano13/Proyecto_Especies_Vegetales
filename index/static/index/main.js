// Hacemos el llamado del mapa para Imprimirlo en pantalla
var map = L.map("map").setView([9.938754825564125, -75.15197753906251], 9);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

//Pintamos las Lineas delimitadoras del departamento de bolivar
var poligon = L.polygon(LatIng, { color: "blue" }).addTo(map);

//Realizamos La busqueda tambien precionando ENTER 

document.getElementById('plant-search').addEventListener('keypress', function(event) {
  if (event.key === 'Enter') {
    event.preventDefault();  // Evitar el comportamiento predeterminado de recargar la página
    searchPlant();   
  }
});

//Aplicamos la busqueda de las zonas por medio de las cordenas tomando en cuenta el valor ingresado en el Input
function searchPlant() {
  const plantName = document.getElementById('plant-search').value;
  fetch(`/plant-location/?plant_name=${plantName}`)
    .then(response => response.json())
    .then(data => {
      if (data.plant_location) {
        console.log(`Location: ${data.plant_location}`);
        const image = data.plant_image;
        const [lat, lng] = data.plant_location.split(',').map(Number);
        map.flyTo([lat, lng], 14);
        const marker = L.marker([lat, lng]).addTo(map)
          .bindPopup(`<div id="${data.plant_id}"><b>${plantName}</b><br /> <img src="../../static/images/${image}" alt="${plantName}" style="width:100px; height:100px;"></div>`)
          .openPopup();
        marker.plantId = data.plant_id;

        marker.on('click', function() {
          showPlantDetails(marker.plantId);
        });

        // var popup = document.querySelector('.leaflet-popup-content-wrapper');
        // if (popup) {
        //   popup.addEventListener('click', function() {
        //     showPlantDetails(marker.plantId);
        //   });
        // }
        document.querySelectorAll('.leaflet-popup-content-wrapper').forEach(popup => {
          popup.setAttribute('data-plant-id', marker.plantId);
          popup.addEventListener('click', function() {
            const plantId = this.getAttribute('data-plant-id');
            showPlantDetails(plantId);
          });
        });
      } else {
        console.error('Planta no encontrada');
      }
    })
    .catch(error => console.error('Error:', error));
}

function showPlantDetails(plantId) {
  fetch(`/plant-detail/${plantId}/`)
    .then(response => response.json())
    .then(data => {
      const infoPopup = document.getElementById('info-popup');
      infoPopup.innerHTML = `
        <div class="content-div-main">
          <div>
            <h3>${data.name}</h3>
            <p>${data.description}</p>
            <p>Ubicación: ${data.location}</p>
            <p>Estado: ${data.estado}</p>
            <button class="close-btn" onclick="closeInfoPopup()">Cerrar</button>
          </div>
          <div>
            <img src="../../static/images/${data.image}" alt="${data.name}" style="width:100px; height:100px;">
          </div>
        </div>
      `;
      infoPopup.style.display = 'block';
    })
    .catch(error => console.error('Error:', error));
}

function closeInfoPopup() {
  const infoPopup = document.getElementById('info-popup');
  infoPopup.style.display = 'none';
}

// Añadir un evento de clic al mapa
map.on("click", function (e) {
  // Obtener las coordenadas donde se hizo clic
  var lat = e.latlng.lat;
  var lng = e.latlng.lng;

  document.getElementsByClassName("leaflet-popup-content-wrapper").display = 'none';

  // Imprimir las coordenadas en la consola
  console.log(lat + "," + lng);
});
