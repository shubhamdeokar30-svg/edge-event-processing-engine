import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router'; // Fixes 'router-outlet' error
import { DashboardComponent } from './features/dashboard/dashboard'; 
import { EventService } from './core/services/event'; // Adjust path if needed

@Component({
  selector: 'app-root',
  standalone: true,
  // Add RouterModule to this list
  imports: [CommonModule, FormsModule, RouterModule, DashboardComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent implements OnInit {
  title = 'Edge Event Engine';
  isServerConnected = false;

  constructor(private eventService: EventService) {}

  ngOnInit() {
    this.checkConnection();
  }

  checkConnection() {
    this.eventService.getHealth().subscribe({
      next: () => this.isServerConnected = true,
      error: () => this.isServerConnected = false
    });
  }
}


