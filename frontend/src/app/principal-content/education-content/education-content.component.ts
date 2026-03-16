import { SCHOOL_LOGOS, SCHOOL_URLS } from './school-urls';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Education } from '../../models';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import educationData from '../../../assets/static-education.json';
import { TECH_URLS } from '../experience-content/tech-urls';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-education-content',
  templateUrl: './education-content.component.html',
  styleUrl: './education-content.component.scss',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule]
})
export class EducationContentComponent implements OnInit {
  diplomas: Education[] = [];
  certifications: Education[] = [];

  /**
   * Découpe la description en parties (séparateur : virgule, point-virgule, ou saut de ligne)
   */
  splitDescriptionParts(description: string): string[] {
    if (!description) return [];
    return description.split(/[,;\n]/g);
  }

  constructor(
    public authService: AuthService,
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {
    // Conversion des dates string -> Date et ajout de la propriété expanded
    const allEducation = (educationData as any[]).map(e => ({
      ...e,
      startDate: new Date(e.startDate),
      endDate: e.endDate ? new Date(e.endDate) : undefined,
      expanded: false
    }));
    this.diplomas = allEducation
      .filter(e => e.type === 'diplome')
      .sort((a, b) => {
        // Si endDate existe, trier par endDate décroissante, sinon par startDate décroissante
        const aDate = a.endDate || a.startDate;
        const bDate = b.endDate || b.startDate;
        return bDate.getTime() - aDate.getTime();
      });
    this.certifications = allEducation.filter(e => e.type === 'certification');
  }

  // Suppression désactivée pour la version statique
  deleteEducation(id: string): void {
    alert('Suppression désactivée en mode statique.');
  }

  getTechUrl(tech: string): string | null {
    return TECH_URLS[tech.trim()] || null;
  }

  getSchoolUrl(school: string): string | null {
    return SCHOOL_URLS[school.trim()] || null;
  }

  getSchoolLogo(school: string): string | null {
    return SCHOOL_LOGOS[school.trim()] || null;
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