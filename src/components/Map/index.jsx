// import './style.css';
import {Map, MapBrowserEvent, View} from 'ol';
import GeoJSON from 'ol/format/GeoJSON.js';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer.js';
import {Style, Stroke, Fill} from 'ol/style';
import * as olProj from 'ol/proj';
import {OSM, Vector as VectorSource} from 'ol/source.js';
import Select from 'ol/interaction/Select.js';
import React, { useEffect } from 'react';
import { districts } from '../../../data/districts';

function hexToRgbA(hex, opacity){
  var c;
  if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
      c= hex.substring(1).split('');
      if(c.length== 3){
          c= [c[0], c[0], c[1], c[1], c[2], c[2]];
      }
      c= '0x'+c.join('');
      return 'rgba('+[(c>>16)&255, (c>>8)&255, c&255].join(',')+',' + opacity + ')';
  }
  throw new Error('Bad Hex');
}


// Portugal Source
const source = new VectorSource({
  url: 'data/portugal.geojson',
  format: new GeoJSON(),
});

// Center on Portugal
const view = new View({
  center: olProj.fromLonLat([-8.6100, 39.1496]), // Portugal Coordinations
  zoom: 6.5
});

// Portugal Layer and Styling
const vectorLayer = new VectorLayer({
  source: source,
  style: (feature) => {
    const colorCode = districts.filter(d => d.name == feature.values_.name)[0].colorCode;
    return new Style({
      fill: new Fill({
        color: hexToRgbA(colorCode, .3),
    }),
  })
  } 
});

// Highlight selected Region
let select = new Select(
  {
    style: (feature) => {
      const colorCode = districts.filter(d => d.name == feature.values_.name)[0].colorCode;
      return new Style({
        fill: new Fill({
          color: hexToRgbA(colorCode, .3),
        }),
        stroke: new Stroke({
          color: hexToRgbA(colorCode, 1),
          width: 3,
        }),
    })
    }
  }
);

export default function MapComponent (props) {

  useEffect(() => {
    if (props.selection) {
      const feature = source.getFeatures().find(f => f.values_.name == props.selection);

      if (!feature) return;

      // Highlight
      select.getFeatures().clear();
      select.getFeatures().push(feature);

      // Zoom
      const polygon = feature.getGeometry();
      view.fit(polygon, {padding: [170, 50, 30, 150]});
    }
  }, [props.selection]);


  useEffect(() => {
    // Create Map
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

    // Add Selection
    map.addInteraction(select);

    // Register Selection
    // select.on('select', (e) => {
    //   if (e.selected.length > 0) {
      
    //     const district = e.selected[0].values_.name;
    //     props.setSelectdion(selectedDistrict);
    //   }
    // });
  }, []);
  
  return <div id="map"></div>;
}