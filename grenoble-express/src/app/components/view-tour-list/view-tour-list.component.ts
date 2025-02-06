import {Component, inject} from '@angular/core';
import {Router} from '@angular/router';
import {MatTableModule} from '@angular/material/table';
import {FormsModule} from '@angular/forms';
import {MatButton} from '@angular/material/button';

interface Commande {
  nom_tournee: string;
  livreurs: string;
  camion: string;
  date: string;
  id: string;
}
const ELEMENT_DATA: Commande[] = [
  {
    id: "1",
    nom_tournee: "Grenoble",
    livreurs: "Joran,Benjamin",
    camion: "AB-123-CD",
    date: "04/01/24",

  },
  {
    id: "2",
    nom_tournee: "Grenoble",
    livreurs: "Fatimouta",
    camion: "MN-852-QR",
    date: "06/11/24",

  },
];

@Component({
  selector: 'app-view-tour-list',
  imports: [
    MatTableModule,
    FormsModule,
    MatButton,
  ],
  standalone: true,
  templateUrl: './view-tour-list.component.html',
  styleUrl: './view-tour-list.component.scss'
})
export class ViewTourListComponent {
  displayedColumns: string[] = ['nom_tournee', 'livreurs', 'camion', 'date', 'action'];
  dataSource = ELEMENT_DATA;

  private _router = inject(Router);

  onClickTour(id: string, event: MouseEvent) {
    this._router.navigate(["/liste-tournees", id]);
  }
}
