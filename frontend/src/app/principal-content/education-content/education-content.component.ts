import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DataService } from '../../services/data.service';
import { Education } from '../../models';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-education-content',
  templateUrl: './education-content.component.html',
  styleUrl: './education-content.component.scss',
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class EducationContentComponent implements OnInit {
  diplomas: Education[] = [];
  certifications: Education[] = [];

  constructor(
    private dataService: DataService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.dataService.getEducation().subscribe((educationList) => {
      this.diplomas = educationList.filter(e => e.type === 'diplome');
      this.certifications = educationList.filter(e => e.type === 'certification');
    });
  }


  deleteEducation(id: string): void {
    if (confirm('Are you sure you want to delete this education?')) {
      this.dataService.deleteEducation(id).subscribe({
        next: () => {
          // Recharge la liste après suppression
          this.dataService.getEducation().subscribe((educationList) => {
            this.diplomas = educationList.filter(e => e.type === 'diplome');
            this.certifications = educationList.filter(e => e.type === 'certification');
          });
        },
        error: (err) => {
          console.error('Error deleting education:', err);
          alert('Error deleting education');
        }
      });
    }
  }
}