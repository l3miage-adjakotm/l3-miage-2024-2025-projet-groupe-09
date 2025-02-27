import { Component, computed, input, model, output} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LeafletModule } from '@bluehalo/ngx-leaflet';
import { Icon, icon, LatLng, latLng, Layer, MapOptions, marker, Marker, polyline, Polyline, tileLayer } from 'leaflet';

@Component({
  selector: 'app-map',
  imports: [
    LeafletModule,
    FormsModule
  ],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent {  
  public latitude = model<number>(45.166672);
  public longitude = model<number>(5.71667);
  public zoom = model<number>(12);
  public center = computed<LatLng>(() => latLng(this.latitude(), this.longitude()));

  public readonly markers = input<LatLng[]>([]);//marker pour les adresses ou en livre les colis
  public readonly polylines = input<LatLng[][]>([[]]);
  public readonly othermarkers = input<Marker[]>([]);//marker de debut et fin de tournees

  public readonly _polylines = computed<Polyline[]>(() =>this.polylines().map(line => polyline(line,{color :'blue'})));
  public readonly _markers = computed<Marker[]>(() => this.markers()?.map(m => this.latLngToMarker(m)));

  private readonly layer = tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' });
  public layers = computed<Layer[]>(() => [this.layer,this.othermarkers(),this._markers(),...this._polylines()].flat().filter(l => l !== undefined) as Layer[]);

  public options = computed<MapOptions>(() => ({ layers: this.layers(), zoom: this.zoom(), center: this.center()}));


  latLngToMarker(latLng: LatLng): Marker {
      return marker(
          [latLng.lat, latLng.lng], {
          icon: icon({
          ...Icon.Default.prototype.options,
          iconUrl: 'assets/marker-icon.png',
          iconRetinaUrl: 'assets/marker-icon-2x.png',
          shadowUrl: 'assets/marker-shadow.png'
          })
      });
  }

  public leafletCenterChange = output<LatLng>();
  public leafletZoomChange = output<number>();

  latChange(l: number) {
    this.latitude.set(l);
    this.leafletCenterChange.emit(latLng(this.latitude(), this.longitude()));
  }
  longChange(l: number) {
    this.longitude.set(l);
    this.leafletCenterChange.emit(latLng(this.latitude(), this.longitude()));
  }

  centerChange(c: LatLng) {
    this.latChange(c.lat);
    this.longChange(c.lng);
  }
  zoomMapChange(z: number) {
    this.zoom.set(z);
  }

  zoomChange(z: number) {
    this.leafletZoomChange.emit(z);
  }
}