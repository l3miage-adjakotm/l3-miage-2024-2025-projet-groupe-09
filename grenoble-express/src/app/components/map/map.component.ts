import {Component, computed, inject, model, OnInit, signal} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LeafletModule } from '@bluehalo/ngx-leaflet';
import { Icon, icon, LatLng, latLng, Layer, MapOptions, marker, Marker, polyline, Polyline, tileLayer } from 'leaflet';
import {ActivatedRoute} from '@angular/router';
import {Tour, Job, Vehicle, OptimizationBodyRequest} from '../../data/types';
import {DeliveryService} from '../../service/delivery.service';
import {GeoServiceService} from '../../service/geo-service.service';
import {MultiLineString} from 'geojson';

type AddressForResearch = {
  address: string,
  codePostal: string | number
}

@Component({
  selector: 'app-map',
  imports: [
    LeafletModule,
    FormsModule,
  ],
  standalone: true,
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent implements OnInit {

  private _route = inject(ActivatedRoute);
  private _deliveryService = inject(DeliveryService);
  private _geoService = inject(GeoServiceService);

  private _id = signal<string>("");
  protected tour = signal<Tour>({
    name: "",
    orders: [],
    date: "",
    truck: {
      jdds: [],
      code: "",
      immatriculation: "",
      latitude: null,
      longitude: null,
      kilometrage: 0,
      type: "",
      entrepot: ""
    },
    delivers: []
  });
  protected addressesForResearch = signal<readonly AddressForResearch[]>([]);

  public latitude = model<number>(45.166672);
  public longitude = model<number>(5.71667);
  public zoom = model<number>(12);
  public center = computed<LatLng>(() => latLng(this.latitude(), this.longitude()));

  private readonly coordinatesCustomerLayers = signal<LatLng[]>([]);
  private readonly coordinatesCustomerLayersMakers = computed(() => this.coordinatesCustomerLayers().map(this.latLngToMarkerForClientAddress));

  private readonly coordinatesStoreLayers = signal<LatLng[]>([]);
  private readonly coordinatesStoreLayersMakers = computed(() => this.coordinatesStoreLayers().map(this.latLngToMarkerForStore));

  private readonly layer = signal<MultiLineString>({coordinates: [], type: 'MultiLineString'});
  private readonly layerCoordinates = computed<LatLng[][]>(()=>this.layer().coordinates.map(line => line.map(coord => latLng(coord[1], coord[0]))));
  private readonly polylines = computed<Polyline[]>(() =>this.layerCoordinates().map(line => polyline(line,{color :'blue'})));
  private readonly baseLayer = tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' });
  public layers = computed<Layer[]>(() => [
    this.baseLayer,
    ...this.polylines(),
    ...this.coordinatesStoreLayersMakers(),
    ...this.coordinatesCustomerLayersMakers()
  ]);

  public options = computed<MapOptions>(() => ({ layers: this.layers(), zoom: this.zoom(), center: this.center()}));

  constructor() {
  }

  async ngOnInit(): Promise<void> {
    this._id.set(this._route.snapshot.params['id']);
    await this.getTour();
    await this.getStore();
    this.setCustomersAddresses();
    await this.getListCoordinates();
  }

  latLngToMarkerForClientAddress(latLng: LatLng): Marker {
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

  latLngToMarkerForStore(latLng: LatLng): Marker {
    return marker(
      [latLng.lat, latLng.lng], {
        icon: icon({
          ...Icon.Default.prototype.options,
          iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Redcolor.png/640px-Redcolor.png',
          iconRetinaUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Redcolor.png/640px-Redcolor.png',
          shadowUrl: 'assets/marker-shadow.png'
        })
      });
  }

  private async getTour() {
    const tour = await this._deliveryService.getTourById(this._id());
    this.tour.set(tour);
  }


  private async getStore() {
    const store = await this._deliveryService.getStore();
    const storeAddress: AddressForResearch = {
      address: store.adresse,
      codePostal: store.code_postal
    };
    this.addressesForResearch.update(adr => [...adr, storeAddress]);
  }

  private parseCustomersAddress(): readonly AddressForResearch[] {
    return this.tour().orders.map(
      order => ({address: order.client.adresse, codePostal: order.client.code_postal})
    )
  }

  private setCustomersAddresses() {
    const addresses = this.parseCustomersAddress();
    this.addressesForResearch.update(adr => [...adr, ...addresses]);
  }

  private async getListCoordinates() {
    const addresses: readonly string[] = this.addressesForResearch().map(
      adr => `${adr.address} ${adr.codePostal}`
    );

    const coordinates = await Promise.all(addresses.map(this._geoService.geocode));
    const customersCoordinates = coordinates.slice(1);

    this.coordinatesStoreLayers.set([coordinates[0]]);
    this.coordinatesCustomerLayers.set(customersCoordinates);

    await this.getCoordinatesFromORS(coordinates);
  }

  private async getCoordinatesFromORS(coordinates: LatLng[]) {
    const list: [number, number][] = coordinates.map(({ lat, lng }) => [lng, lat]);

    const bodyForOpt = this.getBodyForOptimization(list);
    const opsCoordinates = await  this._geoService.getItinerary(await this._geoService.getItineraryTourOptimized(bodyForOpt));
    this.layer.set(opsCoordinates);
  }


  private getJobs(tab:[number,number][]):Job[] {
    return tab.map((x,i)=>{return {id:i+1,service:300,delivery:[1],location:x,skills:[1]}});
  }

  private getVehicles():Vehicle[] {
    return [{id:1,profile:"driving-car",start:[5.7369725,45.14852],end:[5.7369725,45.14852],capacity:[4],skills:[1,14]}];
  }

  private getBodyForOptimization(list:[number,number][]):OptimizationBodyRequest{
    return {jobs:this.getJobs(list),vehicles:this.getVehicles()};
  }
}
