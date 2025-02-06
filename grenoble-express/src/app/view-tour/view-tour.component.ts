import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';


interface Commande {
  nom_tournee: string;
  livreurs: string;
  camion: string;
  date: string;

}
const ELEMENT_DATA: Commande[] = [
  { 
    nom_tournee: "Grenoble", 
    livreurs: "Joran,Benjamin", 
    camion: "AB-123-CD", 
    date: "04/01/24", 

  },
  { 
    nom_tournee: "Grenoble", 
    livreurs: "Fatimouta", 
    camion: "MN-852-QR", 
    date: "06/11/24", 

  },
];


@Component({
  selector: 'app-view-tour',
  imports: [MatTableModule,FormsModule],
  templateUrl: './view-tour.component.html',
  styleUrl: './view-tour.component.scss'
})


export class ViewTourComponent {
  displayedColumns: string[] = ['nom_tournee', 'livreurs', 'camion', 'date'];
  dataSource = ELEMENT_DATA;
  
}