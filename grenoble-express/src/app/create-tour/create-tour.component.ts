import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';

/*@Component({
  selector: 'app-create-tour',
  imports: [],
  templateUrl: './create-tour.component.html',
  styleUrl: './create-tour.component.scss'
})
export class CreateTourComponent {

}/*
/**
 * @title Basic buttons
 */


interface Livreur {
  name: string;
}
interface Camion{
  code: string;
}

@Component({
  selector: 'app-create-tour',
  templateUrl: './create-tour.component.html',
  styleUrl: './create-tour.component.scss',
  imports: [MatButtonModule, MatDividerModule, MatIconModule,FormsModule,MatButtonModule,MatInputModule,MatSelectModule,MatFormFieldModule],
})

export class CreateTourComponent {
  Livreurs: Livreur[] = [
    {name: 'Jojo'},
    {name : 'Tiana'},
    {name: 'Fatimouta'},
  ];

  Camions: Camion[]=[
    {code: 'cg135'},
    {code: 'cg137'},
    {code: 'cg735'},
  ]
}