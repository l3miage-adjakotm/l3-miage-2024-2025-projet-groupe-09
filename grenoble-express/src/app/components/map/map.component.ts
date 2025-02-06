import {Component, computed, inject, input, model, OnInit, output, signal} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LeafletModule } from '@bluehalo/ngx-leaflet';
import { Icon, icon, LatLng, latLng, Layer, MapOptions, marker, Marker, polyline, Polyline, tileLayer } from 'leaflet';
import {ActivatedRoute} from '@angular/router';
import {undefined, z} from 'zod';
import {DisplayedOrder, Tour} from '../../data/types';
import {DeliveryService} from '../../service/delivery.service';
import {GeoServiceService} from '../../service/geo-service.service';
import {GeoJSON2DMultiLineString} from 'zod-geojson';
import {MultiLineString} from 'geojson';
import {JsonPipe} from '@angular/common';

type AddressForResearch = {
  address: string,
  codePostal: string | number
}

@Component({
  selector: 'app-map',
  imports: [
    LeafletModule,
    FormsModule,
    JsonPipe
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

  private readonly layer = tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' });
  public layers = computed<Layer[]>(() => [
    this.layer
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
  }

  private async getCoordinatesFromORS(coordinates: LatLng[]) {
    const list: [number, number][] = coordinates.map(({ lat, lng }) => [lng, lat]);

    const opsCoordinates = await this._geoService.getItinerary(list);
  }
}
