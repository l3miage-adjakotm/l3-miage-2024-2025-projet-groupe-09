import {Component, signal} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CreateTourComponent } from "./create-tour/create-tour.component";

@Component({
  selector: 'app-root',
  imports: [
    //RouterOutlet,
    CreateTourComponent
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

}
