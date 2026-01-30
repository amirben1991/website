  promoteUser(user: User): void {
    if (this.isCurrentUser(user)) {
      this.error = 'You cannot change your own role.';
      this.snackBar.open(this.error, 'Fermer', { duration: 3000, panelClass: 'snackbar-error' });
      return;
    }
    this.loading = true;
    this.dataService.promoteUser(user.id).subscribe({
      next: () => {
        this.snackBar.open('Utilisateur promu ADMIN', 'Fermer', { duration: 3000, panelClass: 'snackbar-success' });
        this.loadUsers();
      },
      error: (err) => {
        this.error = `Failed to promote user: ${err.error?.error || err.message}`;
        this.snackBar.open(this.error, 'Fermer', { duration: 3000, panelClass: 'snackbar-error' });
        this.loading = false;
      }
    });
  }

  demoteUser(user: User): void {
    if (this.isCurrentUser(user)) {
      this.error = 'You cannot change your own role.';
      this.snackBar.open(this.error, 'Fermer', { duration: 3000, panelClass: 'snackbar-error' });
      return;
    }
    this.loading = true;
    this.dataService.demoteUser(user.id).subscribe({
      next: () => {
        this.snackBar.open('Utilisateur rétrogradé USER', 'Fermer', { duration: 3000, panelClass: 'snackbar-success' });
        this.loadUsers();
      },
      error: (err) => {
        this.error = `Failed to demote user: ${err.error?.error || err.message}`;
        this.snackBar.open(this.error, 'Fermer', { duration: 3000, panelClass: 'snackbar-error' });
        this.loading = false;
      }
    });
  }
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';
import { AuthService } from '../../services/auth.service';
import { AdminAuditLogComponent } from './admin-audit-log.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

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
  imports: [CommonModule, AdminAuditLogComponent, MatSnackBarModule],
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss']
})
export class AdminUsersComponent implements OnInit {
  users: User[] = [];
  loading = false;
  error: string | null = null;

  constructor(
    private dataService: DataService,
    public authService: AuthService,
    private snackBar: MatSnackBar
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
    if (this.authService.getUsername() === username) {
      this.error = 'You cannot delete your own account.';
      this.snackBar.open(this.error, 'Fermer', { duration: 3000, panelClass: 'snackbar-error' });
      return;
    }
    if (!confirm(`Are you sure you want to delete user "${username}"? This will also delete all associated conversations.`)) {
      return;
    }

    this.loading = true;
    this.dataService.deleteUser(userId).subscribe({
      next: (response: DeleteResponse) => {
        this.snackBar.open('Utilisateur supprimé (soft delete)', 'Fermer', { duration: 3000, panelClass: 'snackbar-success' });
        this.loadUsers(); // Reload list
      },
      error: (err) => {
        this.error = `Failed to delete user: ${err.error?.message || err.message}`;
        this.snackBar.open(this.error, 'Fermer', { duration: 3000, panelClass: 'snackbar-error' });
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

  isCurrentUser(user: User): boolean {
    return this.authService.getUsername() === user.username;
  }
}
