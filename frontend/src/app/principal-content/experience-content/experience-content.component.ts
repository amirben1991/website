import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Experience } from '../../models';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

// Importation des données statiques
import experiencesData from '../../../assets/static-experiences.json';

@Component({
  selector: 'app-experience-content',
  templateUrl: './experience-content.component.html',
  styleUrl: './experience-content.component.scss',
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class ExperienceContentComponent implements OnInit {
  experiences: Experience[] = [];

  constructor(
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    // Conversion des dates string -> Date
    this.experiences = (experiencesData as any[]).map(e => ({
      ...e,
      startDate: new Date(e.startDate),
      endDate: e.endDate ? new Date(e.endDate) : undefined
    }));
  }

  // Suppression désactivée pour la version statique
  deleteExperience(id: string): void {
    alert('Suppression désactivée en mode statique.');
  }
}