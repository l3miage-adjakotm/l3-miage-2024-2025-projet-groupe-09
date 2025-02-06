import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';

interface Tournee {
  nom_tournee: string;
  livreurs: string;
  camion: string;
  date: string;
}

@Component({
  selector: 'app-one-tour',
  imports: [MatButtonModule,MatTableModule, FormsModule],
  templateUrl: './one-tour.component.html',
  styleUrls: ['./one-tour.component.scss']
})
export class OneTourComponent {

  displayedColumns: string[] = ['nom_tournee', 'livreurs', 'camion', 'date']; 

  tournee: Tournee = { 
    nom_tournee: "Grenoble", 
    livreurs: "Joran, Benjamin", 
    camion: "AB-123-CD", 
    date: "04/01/24"
  };

  
}