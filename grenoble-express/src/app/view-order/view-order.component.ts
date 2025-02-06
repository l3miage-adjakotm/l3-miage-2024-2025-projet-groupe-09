import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox'; 
import { FormsModule } from '@angular/forms';

interface Commande {
  reference_commande: string;
  reference_client: string;
  adresse: string;
  date: string;
  etat: string;
  selected?: boolean;  
}

const ELEMENT_DATA: Commande[] = [
  { 
    reference_commande: "108", 
    reference_client: "c001", 
    adresse: "5 rue de Poisat Grenoble", 
    date: "04/01/24", 
    etat: "ouverte" 
  },
  { 
    reference_commande: "109", 
    reference_client: "c002", 
    adresse: "10 avenue Jean Jaurès, Grenoble", 
    date: "06/01/24", 
    etat: "fermée" 
  }
];

@Component({
  selector: 'app-view-order',
  imports: [MatTableModule, MatCheckboxModule,FormsModule],
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.scss']
})
export class ViewOrderComponent {
  displayedColumns: string[] = ['select', 'reference_commande', 'reference_client', 'adresse', 'date', 'etat'];
  dataSource = ELEMENT_DATA;

  // Sélectionner/Désélectionner toutes les lignes
  selectAllRows(event: any) {
    const checked = event.checked;
    this.dataSource.forEach(row => row.selected = checked);
  }

  // Vérifier si toutes les lignes sont sélectionnées
  isAllSelected() {
    return this.dataSource.every(row => row.selected);
  }

  // Vérifier si certaines lignes sont sélectionnées
  isSomeSelected() {
    return this.dataSource.some(row => row.selected);
  }

  // Récupérer les lignes sélectionnées
  getSelectedRows() {
    const selectedRows = this.dataSource.filter(row => row.selected);
    console.log(selectedRows);
  }
}
