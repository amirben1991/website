import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';
import { AuthService } from '../../services/auth.service';

interface User {
  id: string;
  username: string;
  email: string;
  role: string;
}

interface DeleteResponse {
  deleted: boolean;
  userId: string;
  conversationsDeleted: number;
}

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss']
})
export class AdminUsersComponent implements OnInit {
  users: User[] = [];
  loading = false;
  error: string | null = null;

  constructor(
    private dataService: DataService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.loading = true;
    this.error = null;
    
    this.dataService.getAllUsers().subscribe({
      next: (users) => {
        this.users = users;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load users';
        this.loading = false;
        console.error('Error loading users:', err);
      }
    });
  }

  deleteUser(userId: string, username: string): void {
    if (!confirm(`Are you sure you want to delete user "${username}"? This will also delete all associated conversations.`)) {
      return;
    }

    this.loading = true;
    this.dataService.deleteUser(userId).subscribe({
      next: (response: DeleteResponse) => {
        console.log(`Deleted user ${response.userId} with ${response.conversationsDeleted} conversations`);
        this.loadUsers(); // Reload list
      },
      error: (err) => {
        this.error = `Failed to delete user: ${err.error?.message || err.message}`;
        this.loading = false;
        console.error('Error deleting user:', err);
      }
    });
  }

  get adminCount(): number {
    return this.users.filter(u => u.role === 'ADMIN').length;
  }

  get userCount(): number {
    return this.users.filter(u => u.role === 'USER').length;
  }
}
