import { COMPANY_URLS } from './company-urls';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Experience } from '../../models';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { TECH_URLS } from './tech-urls';

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
  getCompanyUrl(company: string): string | null {
    return COMPANY_URLS[company.trim()] || null;
  }

  constructor(
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    // Conversion des dates string -> Date et ajout de la propriété expanded
    this.experiences = (experiencesData as any[]).map(e => ({
      ...e,
      startDate: new Date(e.startDate),
      endDate: e.endDate ? new Date(e.endDate) : undefined,
      expanded: false
    }));
  }

  getTechUrl(tech: string): string | null {
    return TECH_URLS[tech.trim()] || null;
  }

  // Suppression désactivée pour la version statique
  deleteExperience(id: string): void {
    alert('Suppression désactivée en mode statique.');
  }
}