import './style.css';
import {Map, View} from 'ol';
import GeoJSON from 'ol/format/GeoJSON.js';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer.js';
import {Style, Stroke, Fill} from 'ol/style';
import * as olProj from 'ol/proj';
import {OSM, Vector as VectorSource} from 'ol/source.js';

var portugalCoords = olProj.fromLonLat([-8.6100, 39.1496]);

const source = new VectorSource({
  url: 'data/portugal.geojson',
  format: new GeoJSON(),
});

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

const map = new Map({
  target: 'map',
  layers: [
    new TileLayer({
      source: new OSM()
    }),
    vectorLayer,
  ],
  view: new View({
    center: portugalCoords,
    zoom: 7
  })
});