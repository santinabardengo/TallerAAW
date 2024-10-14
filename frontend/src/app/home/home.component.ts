import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private router: Router) { }

  navigateToUser() {
    this.router.navigate(['/user-map']);
  }

  navigateToAdmin() {
    this.router.navigate(['/admin-pin']);
  }
}
