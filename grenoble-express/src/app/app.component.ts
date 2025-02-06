import { Component, computed, inject, output, signal } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
import { MapComponent } from './map/map.component';
import { latLng, LatLng, Marker,icon, marker, Icon } from 'leaflet';
import { MultiLineString } from 'geojson';
import { FormsModule } from '@angular/forms';
import { GeoServiceService } from './service/geo-service.service';
import {GeoJSON2DMultiLineString } from 'zod-geojson';

@Component({
  selector: 'app-root',
  imports: [
    // RouterOutlet,
    FormsModule,
    MapComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  public marke = signal<LatLng[]>([]);//pour afficher les livraisons sur la carte
  public othermarke = signal<Marker[]>([]);//pour afficher le point de départ et d'arrivées
  public centro = signal<LatLng>(latLng(45.166672,5.71667));

  public adresseService = inject(GeoServiceService);

  public reverse = (obj: LatLng): Promise<string[]> => {
  if (obj != undefined) {
    return this.adresseService.reverseGeocode(obj);
  } else {
    return Promise.resolve([""]);
  }
  };

  public searchgeocode = (obj: string): Promise<LatLng> => {
    if (obj != undefined) {
      return this.adresseService.geocode(obj);
    } else {
      return Promise.resolve(new LatLng(0, 0));
    }
  };

  
  public async trouveAdresses(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      var mylatlong = await this.searchgeocode(this.adresse())
      this.centro.set(mylatlong);
      console.log(mylatlong);
      this.ad.set(await this.reverse(mylatlong));
      console.log(this.ad());
      }
  };
  
  public t = signal<string[]>(["Aucune adresse à afficher..."]);
  protected _t = computed(() => this.t());
  public ad = signal<string[]>([]);
  protected _adresse = computed(() => this.ad());
  public adresse = signal<string>("");



  public listepoint = computed<[number, number][]>(()=>this.marke().map((c)=>[c.lng, c.lat]));//listede point peut être inutile vu qu'y en a en bas

  public getItineraire = (obj: [number, number][]): Promise<GeoJSON2DMultiLineString> =>{
    if (obj!=undefined) {
      return this.adresseService.getItinerary(obj);
}
  else {
    throw new Error('Itinéraire impossible à calculer');
  }
  };
  

  private readonly layer = signal<MultiLineString>({coordinates: [],type: 'MultiLineString'});
  public readonly _layer = computed<LatLng[][]>(()=>this.layer().coordinates.map(line => line.map(coord => latLng(coord[1], coord[0]))));

  public getIitinaireoptimized = (): Promise<[number,number][]> => {
    return this.adresseService.getItineraryTourOptimized();
  };
    
  latLngToMarker(latLng: LatLng, type: string): Marker {
    var st = type == "debut" ? "https://upload.wikimedia.org/wikipedia/commons/0/07/Flag-export.png?20120830154408" : 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Redcolor.png/640px-Redcolor.png';
      return marker(
          [latLng.lat, latLng.lng], {
          icon: icon({
          ...Icon.Default.prototype.options,
          iconUrl: st,
          iconRetinaUrl: undefined,
          shadowUrl: 'assets/marker-shadow.png'
          })
      });
  }
  


  public async bouttonClick() {
    //var coord = await this.getItineraire(this.listepoint()); 
    var coord = await this.getIitinaireoptimized();
    var marquesansdebutfin = coord.map((c:number[]) => latLng(c[1], c[0])).slice(1,-1)
    this.marke.set(marquesansdebutfin);
    var coordit =await this.getItineraire(coord);
    this.layer.set({ coordinates: coordit.coordinates, type: 'MultiLineString' });
    this.othermarke.set([this.latLngToMarker(this._layer()[0][0],"debut"),this.latLngToMarker(this._layer()[0][this._layer().length-1],'fin')]);
      
    // console.log("liste de marker", this.marke);
    // console.log("liste de points:",this.listepoint());
    // console.log("polyline",this._layer());
  }

}