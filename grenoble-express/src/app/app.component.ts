import {Component, signal} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CreateTourComponent } from "./create-tour/create-tour.component";
import { NavBarComponent } from "./nav-bar/nav-bar.component";

@Component({
  selector: 'app-root',
  imports: [
    //RouterOutlet,
    CreateTourComponent,
    NavBarComponent
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

}
