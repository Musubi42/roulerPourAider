<template>
  <div ref="mapContainer" class="map-container"></div>
</template>

<style scoped>
.map-container {
  height: 100vh;
  width: 100%;
}
</style>

<script setup>
import L from 'leaflet';
import franceBorderMetropole from '/assets/france-geojson-metropole.json'; 

const mapContainer = ref(null);
let geoFranceBorder = ref(null);

const polyline = ref(null);
let animateId = null; // To hold the requestAnimationFrame ID

const markers = ref([]);


// TODO: Le zoom n'est pas désactivé
const mapOptions = {
  zoom: 5.5,
  center: [46.2276, 2.2137],
  touchZoom: false,
  dragging: false,
  zoomControl: false

};

const primary = "#72BC7A";
const secondary = "#2A5FA4";

const geojsonOptions = {
  style: () => ({
    fillColor: primary,     // Only inside France
    weight: 1,
    opacity: 1,
    color: secondary,      // Color of the border line
    fillOpacity: 1,         // Solid fill
  }),
  interactive: false  // This prevents the layer from being interactive
};

onMounted(() => {
  const map = L.map(mapContainer.value, mapOptions);

  mapContainer.value.style.cursor = 'default'; 

  geoFranceBorder = L.geoJSON(franceBorderMetropole, geojsonOptions).addTo(map);

  // TODO: Create a route that isn't linear but with curves
  const routeParisToBlois = generateIntermediatePoints([48.8566, 2.3522], [47.5939, 1.3281], 10);
  polyline.value = L.polyline(routeParisToBlois, {
    color: 'white',
    dashArray: '20, 20',
    dashOffset: '0',
    weight: 5
  }).addTo(map);

  // Add markers
  const parisMarker = L.marker([48.8566, 2.3522], { icon: customIcon }).addTo(map);
  parisMarker.bindPopup('Paris, 1ère étape, Paris à Blois 250km', {
    offset: L.point(-2, 35) // Moves the popup 20 pixels down from the marker
  });
  markers.value.push(parisMarker);

  parisMarker.on('mouseover', () => {
    polylineAnimation(polyline.value);
    changeBackgroundImage('paris');
  });

  parisMarker.on('mouseout', () => {
    stopAnimation();
    resetAnimation();
    resetBackgroundImage();
  });


  const bloisMarker = L.marker([47.5939, 1.3281], { icon: customIcon }).addTo(map);
  var point = L.point(200, 300);
  bloisMarker.bindPopup('Blois, a beautiful city with rich history in the Loire Valley.', {
    offset: L.point(-2, 35) // Moves the popup 20 pixels down from the marker
  });

  const CustomOverlay = L.Layer.extend({
    onAdd: function (map) {
      console.log(map);
      const latlng = new L.LatLng(47.5939, 1.3281);
      console.log("latlng", latlng);
      this._div = L.DomUtil.create('div', 'my-custom-overlay'); // Create a div element with a class for styling
      this._div.innerText =  "Blois"
      // Position it at the marker's location
      const position = map.latLngToLayerPoint(latlng);
      this._div.style.position = 'absolute';
      this._div.style.left = (position.x + 20) + 'px';
      this._div.style.top = position.y + 'px';
      this._div.style.zIndex = 1000;
      map.getPanes().overlayPane.appendChild(this._div);
    },
    onRemove: function (map) {
      L.DomUtil.remove(this._div);
    },
    updatePosition: function() {
      const position = this._map.latLngToLayerPoint(latlng);
      this._div.style.left = position.x + 'px';
      this._div.style.top = position.y + 'px';
    }
  });

  // Add custom overlay next to the marker
  const textOverlay = new CustomOverlay({
    latlng: new L.LatLng(47.5939, 1.3281),
    text: 'Blois'
  }).addTo(map);

  markers.value.push(bloisMarker);



  // TODO: Il faut que je crée le SVGElement au mounted, par contre à ce moment il me suffit de changer l'image
  // Créer un SVGElement sans image, au hover rajouter la bonne image
  function changeBackgroundImage(city) {
    geoFranceBorder.setStyle({
      fillColor: 'transparent',
    });

    if (city === 'paris') {
      console.log("Paris");
      
      const svgPath = geoJSONToSVGPath(franceBorderMetropole, map)

      const svgElement = createSVGFromPath(map, svgPath, '/paris.jpeg');
      document.body.appendChild(svgElement);
    }
    // Add cases for other cities similarly
  }

  function resetBackgroundImage() {
    geoFranceBorder.setStyle({
      fillColor: primary,
    });
  }
});

function geoJSONToSVGPath(geoJson, map) {
  let pathString = '';
  const layer = L.geoJSON(geoJson);
  layer.eachLayer(function(layer) {
      const svgPath = new L.SVG();
      svgPath._container = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      const feature = layer.feature;

      if (feature.geometry.type === 'Polygon') {
          const latlngs = layer.getLatLngs();
          // Single Polygon
          pathString += convertCoordinatesToPath(latlngs[0], map);
      } else if (feature.geometry.type === 'MultiPolygon') {
          // MultiPolygon handling
          const multiLatlngs = layer.getLatLngs();
          multiLatlngs.forEach((polygon) => {
              pathString += convertCoordinatesToPath(polygon[0], map);  // Assuming the first array is the outer boundary
              // If there are holes, they are subsequent arrays
              for (let i = 1; i < polygon.length; i++) {
                  pathString += convertCoordinatesToPath(polygon[i], map);
              }
          });
      }
  });
  return pathString;
}

function convertCoordinatesToPath(coordinates, map) {
    let path = '';
    coordinates.forEach((point, index) => {
        const pt = map.latLngToLayerPoint(point);
        const command = index === 0 ? 'M' : 'L';
        path += `${command}${pt.x},${pt.y} `;
    });
    return path + 'Z'; // Close the path
}

function createSVGFromPath(map, pathData, imageUrl) {
  const svgNS = "http://www.w3.org/2000/svg";
  const mapSize = map.getSize();  // Get current map dimensions
  const bounds = map.getBounds(); // Get geographic bounds visible in the map
  let topLeft = map.latLngToLayerPoint(bounds.getNorthWest());
  let bottomRight = map.latLngToLayerPoint(bounds.getSouthEast());

  let svg = document.createElementNS(svgNS, "svg");
  svg.setAttribute("width", mapSize.x + "px");
  svg.setAttribute("height", mapSize.y + "px");
  svg.setAttribute("viewBox", `0 0 ${mapSize.x} ${mapSize.y}`);
  svg.style.position = "absolute";
  svg.style.left = "0px";  // Align to the map container
  svg.style.top = "0px";

  const defs = document.createElementNS(svgNS, "defs");
  const pattern = document.createElementNS(svgNS, "pattern");
  pattern.setAttribute("id", "img-pattern");
  pattern.setAttribute("patternUnits", "userSpaceOnUse");
  pattern.setAttribute("width", Math.abs(bottomRight.x - topLeft.x) + "px");
  pattern.setAttribute("height", Math.abs(bottomRight.y - topLeft.y) + "px");

  const image = document.createElementNS(svgNS, "image");
  image.setAttributeNS("http://www.w3.org/1999/xlink", "href", imageUrl);
  image.setAttribute("width", Math.abs(bottomRight.x - topLeft.x) + "px");
  image.setAttribute("height", Math.abs(bottomRight.y - topLeft.y) + "px");

  pattern.appendChild(image);
  defs.appendChild(pattern);
  svg.appendChild(defs);

  let path = document.createElementNS(svgNS, "path");
  path.setAttribute("d", pathData);
  path.setAttribute("fill", "url(#img-pattern)");
  path.setAttribute("stroke", "transparent");
  path.setAttribute("stroke-width", "2");
  svg.appendChild(path);

  return svg;
}

function polylineAnimation(polyline) {
  let offset = 0;
  function animate() {
    offset -= 1;
    polyline.setStyle({
      dashOffset: offset,
      color: primary
    });
    animateId = requestAnimationFrame(animate);
  }
  animate();
}

function startAnimation() {
  if (polyline.value) {
    polylineAnimation(polyline.value)
  }
}

function stopAnimation() {
  if (animateId) {
    cancelAnimationFrame(animateId);
  }
}

function resetAnimation() {
    polyline.value.setStyle({ color: 'white' });
}

const customIcon = new L.icon({
  iconUrl: '/blue-circle.svg', // Adjust the path as necessary
  iconSize: [25, 41], // Size of the icon
  iconAnchor: [14, 20], // Point of the icon which will correspond to marker's location
  popupAnchor: [1, -34] // Point from which the popup should open relative to the iconAnchor
});

function generateIntermediatePoints(start, end, numPoints) {
  let points = [start];
  for (let i = 1; i <= numPoints; i++) {
    let lat = start[0] + (end[0] - start[0]) * i / (numPoints + 1);
    let lng = start[1] + (end[1] - start[1]) * i / (numPoints + 1);
    points.push([lat, lng]);
  }
  points.push(end);
  return points;
}

onBeforeUnmount(() => {
  stopAnimation(); // Ensure the animation is stopped when the component unmounts
});
</script>
