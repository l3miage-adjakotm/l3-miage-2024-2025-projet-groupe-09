import {Injectable} from '@angular/core';
import {GeoJSON2DMultiLineString, GeoJSON2DPointSchema, GeoJSONLineStringSchema} from 'zod-geojson';
import {LatLng} from 'leaflet';
import {GeoCodePropertiesSchema, getParserJSONFeatureCollection, PropertiesSchema} from '../data/geojsondef';
import {OptimizationBodyRequest} from '../data/types';

@Injectable({
  providedIn: 'root'
})
export class GeoServiceService {

  constructor() { }


  async reverseGeocode(obj: LatLng): Promise<string[]> {
    var lat = obj.lat;
    var lng = obj.lng;
    var fetr = await fetch(`https://api-adresse.data.gouv.fr/reverse/?lon=${lng}&lat=${lat}`);
    if (fetr.status == 200) {
      var donn = await fetr.json();
      var monparser = getParserJSONFeatureCollection(GeoJSON2DPointSchema, GeoCodePropertiesSchema);
      var parsedData = await monparser(donn);
      if (parsedData.type!='FeatureCollection') {
        throw new Error('Erreur: mauvais type de données');
      }
    }

    else {
      throw new Error('Erreur: Failed to fetch data');
    }
    return donn.features.length>0? donn.features.map((feature: any) => feature.properties.label) : ["Aucune adresse trouvée"];
  }

  // private toAscii(str: string) {
  //   return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  // }

  async geocode(address: string): Promise<LatLng>{
      let monadresse = address.replaceAll(' ', '+').toLowerCase();
      let latetlong;

      let donnees = await fetch('https://api-adresse.data.gouv.fr/search/?q='+monadresse);

      if (donnees.status == 200) {
        latetlong = donnees.json();
      }
      else {
        throw new Error('Erreur: Failed to fetch data');
      }

      return latetlong == undefined ? Promise.resolve(new LatLng(0, 0)) : latetlong.then((data) => {
          if (data.features.length > 0) {
            return new LatLng(data.features[0].geometry.coordinates[1], data.features[0].geometry.coordinates[0]);
          } else {
            throw new Error('Erreur: Aucune adresse trouvée');
          }
        });
  }

  public async getItinerary(liste: [number, number][]): Promise<GeoJSON2DMultiLineString>{
    let donn;
    let fetr = await fetch(
      "https://api.openrouteservice.org/v2/directions/driving-car/geojson",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: '5b3ce3597851110001cf62481247ba530f0e48a280184e6aee1e9794',
        },
        body: JSON.stringify({
          coordinates: liste
        })
      }
    );

    if (fetr.status == 200) {
      donn = await fetr.json();
      let monparser = getParserJSONFeatureCollection(GeoJSONLineStringSchema,PropertiesSchema);
      let parsedData = await monparser(donn);
      if (parsedData.type!='FeatureCollection') {
        throw new Error('Erreur: mauvais type de données');
      }
    }
    else {
      throw new Error('Erreur: Failed to fetch data');
    }
    donn = await donn;
    if (donn.features.length > 0) {
      let _coordinates = donn.features.map((m: any) => m.geometry.coordinates);
      return {coordinates: _coordinates,type:'MultiLineString'};
    }
    return Promise.resolve(donn);
  }

  async getItineraryTourOptimized(body:OptimizationBodyRequest):  Promise<[number,number][][]> {
    var donn;
    var fetr = await fetch("https://api.openrouteservice.org/optimization", {
      method: 'POST',
      headers: {
        'Accept': 'application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8',
        'Authorization': '5b3ce3597851110001cf62481247ba530f0e48a280184e6aee1e9794',
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(body, null, 2)
    });
    if (fetr.status == 200) {
      donn = await fetr.json();
    }
    else {
      throw new Error("Erreur");
    }
    if (donn.code == 0) {
      const liststeps:[number,number][][] = (donn.routes.map((r:any)=>r.steps)).map((s:any)=> s.map((t:any)=>t.location));
      console.log(donn);
      console.log(liststeps);
      return liststeps;
    }
    return Promise.resolve(donn);
  }
}
