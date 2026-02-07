import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'; // Import Observable
import { AuthService } from '../../services/auth.service'; // Import AuthService
import { Project } from '../../models/project.model'; // Import Project model
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
    standalone: true,
    selector: 'app-projects-content',
    imports: [RouterModule, CommonModule, TranslateModule],
    templateUrl: './projects-content.component.html',
    styleUrls: ['./projects-content.component.scss']
})
export class ProjectsContentComponent implements OnInit {

  projects$: Observable<Project[]>; // Properly typed Observable

  constructor(private http: HttpClient, public authService: AuthService, private translateService: TranslateService) { // Changed AuthService to public
    this.projects$ = this.http.get<Project[]>('/assets/static-projects.json');
  }

  ngOnInit(): void {
    // Optional: logging for debugging
    this.projects$.subscribe((data: Project[]) => { // Explicitly type data
        console.log('Projects data loaded:', data);
    });
  }

  deleteProject(id: string): void {
    console.error('Delete functionality is not supported with static data.');
    alert('Delete functionality is not available in static mode.');
  }

  // Helper to get localized content
  getLocalizedField(item: any, fieldName: string): string {
    const lang = this.translateService.currentLang || 'fr';
    const localizedField = `${fieldName}${lang.charAt(0).toUpperCase() + lang.slice(1)}`;
    return item[localizedField] || item[fieldName] || '';
  }
}