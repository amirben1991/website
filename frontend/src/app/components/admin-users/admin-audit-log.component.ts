import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';

interface AdminActionLog {
  id: string;
  adminUsername: string;
  action: string;
  targetUsername: string;
  timestamp: string;
  details?: string;
}

@Component({
  selector: 'app-admin-audit-log',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-audit-log.component.html',
  styleUrls: ['./admin-audit-log.component.scss']
})
export class AdminAuditLogComponent implements OnInit {
  logs: AdminActionLog[] = [];
  loading = false;
  error: string | null = null;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.loadLogs();
  }

  loadLogs(): void {
    this.loading = true;
    this.error = null;
    this.dataService.getAllAuditLogs().subscribe({
      next: (logs: AdminActionLog[]) => {
        this.logs = logs.sort((a: AdminActionLog, b: AdminActionLog) => b.timestamp.localeCompare(a.timestamp));
        this.loading = false;
      },
      error: (err: any) => {
        this.error = 'Failed to load audit logs';
        this.loading = false;
      }
    });
  }
}
