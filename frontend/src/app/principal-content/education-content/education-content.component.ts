import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Education } from '../../models';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import educationData from '../../../assets/static-education.json';

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
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    // Conversion des dates string -> Date
    const allEducation = (educationData as any[]).map(e => ({
      ...e,
      startDate: new Date(e.startDate),
      endDate: e.endDate ? new Date(e.endDate) : undefined
    }));
    this.diplomas = allEducation.filter(e => e.type === 'diplome');
    this.certifications = allEducation.filter(e => e.type === 'certification');
  }

  // Suppression désactivée pour la version statique
  deleteEducation(id: string): void {
    alert('Suppression désactivée en mode statique.');
  }
}