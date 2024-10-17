import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Map, tileLayer} from 'leaflet';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
  ngAfterViewInit() : void {
    const map = new Map('map').setView([-38.9516, -68.0594], 13)

    tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);

  }
}

