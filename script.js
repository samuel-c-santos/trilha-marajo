// Inicializa o mapa
const map = L.map('map').setView([-0.9, -48.0], 12);

// Camadas base
const baseLayers = {
  "CartoDB Voyager": L.tileLayer('https://a.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png', {
    maxZoom: 20,
    attribution: '&copy; OpenStreetMap, CARTO'
  }),
  "OpenStreetMap": L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap contributors'
  }),
  "Google Satélite": L.tileLayer('https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
    maxZoom: 20,
    attribution: '&copy; Google'
  }),
  "Google Relevo": L.tileLayer('https://mt1.google.com/vt/lyrs=p&x={x}&y={y}&z={z}', {
    maxZoom: 20,
    attribution: '&copy; Google Terrain'
  })
};

// Adiciona camada base padrão
baseLayers["CartoDB Voyager"].addTo(map);
L.control.layers(baseLayers).addTo(map);

// Estilo da trilha
const estiloTrilha = {
  color: "orange",  // Terra = laranja
  weight: 4,
  opacity: 0.9
};

// Carrega o percurso
fetch('data/percurso.geojson')
  .then(res => res.json())
  .then(data => {
    const trilha = L.geoJSON(data, { style: estiloTrilha }).addTo(map);
    map.fitBounds(trilha.getBounds());
  })
  .catch(err => console.error("Erro ao carregar percurso.geojson:", err));

// Carrega pontos.geojson (perfil de elevação)
function calcularDistanciaAcumulada(pontos) {
  const distancias = [0];
  let total = 0;
  for (let i = 1; i < pontos.length; i++) {
    const [lon1, lat1] = pontos[i - 1].geometry.coordinates;
    const [lon2, lat2] = pontos[i].geometry.coordinates;

    const R = 6371e3;
    const toRad = deg => deg * Math.PI / 180;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a = Math.sin(dLat/2)**2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon/2)**2;
    const d = R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    total += d;
    distancias.push(total / 1000); // km
  }
  return distancias;
}

fetch('data/pontos.geojson')
  .then(res => res.json())
  .then(geojson => {
    const features = geojson.features;
    const elevacoes = features.map(f => f.properties.ele || 0);
    const distancias = calcularDistanciaAcumulada(features);

    const ctx = document.getElementById('elevationChart').getContext('2d');
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: distancias.map(d => d.toFixed(2) + ' km'),
        datasets: [{
          label: 'Elevação (m)',
          data: elevacoes,
          borderColor: 'rgb(0, 200, 200)',
          backgroundColor: 'rgba(0, 200, 200, 0.2)',
          fill: true,
          tension: 0.1,
          pointRadius: 0
        }]
      },
      options: {
        scales: {
          x: {
            title: {
              display: true,
              text: 'Distância (km)'
            }
          },
          y: {
            title: {
              display: true,
              text: 'Elevação (m)'
            }
          }
        },
        plugins: {
          legend: { display: false }
        },
        responsive: true,
        maintainAspectRatio: false
      }
    });
  })
  .catch(err => console.error("Erro ao carregar pontos.geojson:", err));

// Pontos de apoio (GeoJSON)
fetch('data/pontos_apoio.geojson')
  .then(res => res.json())
  .then(data => {
    L.geoJSON(data, {
      pointToLayer: (feature, latlng) =>
        L.circleMarker(latlng, {
          radius: 8,
          fillColor: 'yellow',
          color: 'black',
          weight: 1,
          fillOpacity: 0.9
        }).bindPopup(`<strong>Ponto de Apoio</strong><br>Km ${feature.properties.km}`)
    }).addTo(map);
  });

const iconSaida = L.icon({
  iconUrl: 'assets/saida.png',
  iconSize: [32, 32],
  iconAnchor: [16, 16],
});

const iconChegada = L.icon({
  iconUrl: 'assets/chegada.png',
  iconSize: [32, 32],
  iconAnchor: [16, 16],
});

fetch('data/limites.geojson')
  .then(res => res.json())
  .then(data => {
    L.geoJSON(data, {
      pointToLayer: (feature, latlng) => {
        if (feature.properties.pt === 'saida') {
          return L.marker(latlng, { icon: iconSaida }).bindPopup("Saída");
        } else if (feature.properties.pt === 'chegada') {
          return L.marker(latlng, { icon: iconChegada }).bindPopup("Chegada");
        }
      }
    }).addTo(map);
  });
