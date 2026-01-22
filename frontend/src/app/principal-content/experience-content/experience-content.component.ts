import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DataService } from '../../services/data.service';
import { Experience } from '../../models';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-experience-content',
  templateUrl: './experience-content.component.html',
  styleUrl: './experience-content.component.scss',
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class ExperienceContentComponent implements OnInit {
  experiences$!: Observable<Experience[]>;

  constructor(
    private dataService: DataService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadExperiences();
  }

  loadExperiences(): void {
    this.experiences$ = this.dataService.getExperience();
  }

  deleteExperience(id: string): void {
    if (confirm('Are you sure you want to delete this experience?')) {
      this.dataService.deleteExperience(id).subscribe({
        next: () => {
          this.loadExperiences();
        },
        error: (err) => {
          console.error('Error deleting experience:', err);
          alert('Error deleting experience');
        }
      });
    }
  }
}