import {Component, inject, signal} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import {RouterLink} from '@angular/router';

import { Router} from '@angular/router';



@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, MatMenuModule, RouterLink],})
export class NavBarComponent {
    
  private _id = signal<string>("");
  
  private _router = inject(Router);
    protected onViewMap() {
    this._router.navigate(["/map", this._id()]);
  }
}
