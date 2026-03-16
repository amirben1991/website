import { COMPANY_LOGOS, COMPANY_URLS } from './company-urls';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Experience } from '../../models';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { TECH_URLS } from './tech-urls';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

// Importation des données statiques
import experiencesData from '../../../assets/static-experiences.json';

@Component({
  selector: 'app-experience-content',
  templateUrl: './experience-content.component.html',
  styleUrl: './experience-content.component.scss',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule]
})
export class ExperienceContentComponent implements OnInit {
  experiences: Experience[] = [];
  getCompanyUrl(company: string): string | null {
    return COMPANY_URLS[company.trim()] || null;
  }

  getCompanyLogo(company: string): string | null {
    return COMPANY_LOGOS[company.trim()] || null;
  }

  constructor(
    public authService: AuthService,
    private translateService: TranslateService
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

  // Helper to get localized content
  getLocalizedField(item: any, fieldName: string): string {
    const lang = this.translateService.currentLang || 'fr';
    const localizedField = `${fieldName}${lang.charAt(0).toUpperCase() + lang.slice(1)}`;
    return item[localizedField] || item[fieldName] || '';
  }

  // Get localized highlights as array
  getLocalizedHighlights(item: any): string[] {
    const lang = this.translateService.currentLang || 'fr';
    const localizedField = lang === 'fr' ? 'highlightsFr' : 'highlightsEn';
    const highlightsStr = item[localizedField];
    if (highlightsStr) {
      return highlightsStr.split('\n').filter((h: string) => h.trim());
    }
    return item.highlights || [];
  }
}