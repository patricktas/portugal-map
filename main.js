import './style.css';
import {Map, MapBrowserEvent, View} from 'ol';
import GeoJSON from 'ol/format/GeoJSON.js';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer.js';
import {Style, Stroke, Fill} from 'ol/style';
import * as olProj from 'ol/proj';
import {OSM, Vector as VectorSource} from 'ol/source.js';
import Select from 'ol/interaction/Select.js';

var portugalCoords = olProj.fromLonLat([-8.6100, 39.1496]);

// Portugal Region Source
const source = new VectorSource({
  url: 'data/portugal.geojson',
  format: new GeoJSON(),
});

// Portugal Layer and Styling
const vectorLayer = new VectorLayer({
  source: source,
  style: new Style({
    fill: new Fill({
      color: 'rgba(0, 0, 0, .3)',
    }),
    stroke: new Stroke({
      color: 'white',
    }),
  })
});

// Center on Portugal
const view = new View({
  center: portugalCoords,
  zoom: 7
});

const map = new Map({
  target: 'map',
  layers: [
    new TileLayer({
      source: new OSM()
    }),
    vectorLayer,
  ],
  view: view
});

// Click Listener for Menu
window.addEventListener("load", (event) => {
  var el = document.getElementById('districts').addEventListener('click', (e) => {
    var selected = e.target.textContent;
    const feature = source.getFeatures().find(f => f.values_.name == selected);
    
    if (!feature) {
      alert(selected + " not found");
      return;
    }

    const polygon = feature.getGeometry();
    view.fit(polygon, {padding: [170, 50, 30, 150]});
  })
});


// Highlight selected Region
let select = new Select(
  {
    style: new Style({
      fill: new Fill({
        color: '#eeeeee',
      }),
      stroke: new Stroke({
        color: 'rgba(255, 255, 255, 0.7)',
        width: 2,
      }),
    })
  }
);

map.addInteraction(select);