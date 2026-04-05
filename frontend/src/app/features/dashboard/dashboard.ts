import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EventService } from '../../core/services/event';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent implements OnInit {
  payload = { deviceId: 'sensor-001', type: 'temperature', value: 75 };
  alerts: any[] = [];
  lastEventId: string = '';
  
  // New variable for connection status
  isServerConnected: boolean = false;

  constructor(private eventService: EventService) {}

  ngOnInit() {
    // Check connection as soon as the dashboard loads
    this.checkStatus();
    
    // Optional: Re-check every 10 seconds to keep it live
    setInterval(() => this.checkStatus(), 10000);
  }

  // Function to ping the backend
  checkStatus() {
    // We reuse the event service or a simple health check
    this.eventService.getHealth().subscribe({
      next: () => this.isServerConnected = true,
      error: () => this.isServerConnected = false
    });
  }

  emit() {
    this.eventService.sendEvent(this.payload).subscribe({
      next: (res) => {
        this.isServerConnected = true; // If the event sends, we are connected
        this.lastEventId = res.eventId;
        if (res.alerts && res.alerts.length > 0) {
          this.alerts = [...res.alerts, ...this.alerts];
        }
      },
      error: (err) => {
        this.isServerConnected = false;
        console.error('Connection Error:', err);
      }
    });
  }

  clear() {
    this.alerts = [];
    this.lastEventId = '';
  }
}