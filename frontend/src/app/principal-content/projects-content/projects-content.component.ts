import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';
import { AuthService } from '../../services/auth.service';
import { Project } from '../../models';
import { Observable } from 'rxjs';


@Component({
    standalone: true,
    selector: 'app-projects-content',
    imports: [RouterModule, CommonModule],
    templateUrl: './projects-content.component.html',
    styleUrls: ['./projects-content.component.scss']
})
export class ProjectsContentComponent implements OnInit {

  projects$: Observable<Project[]>;

  constructor(private dataService: DataService, public authService: AuthService) {
    this.projects$ = this.dataService.getProjects();
  }

  ngOnInit(): void {
    // Optional: logging for debugging
    this.projects$.subscribe(data => {
        console.log('Projects data loaded:', data);
    })
  }

    deleteProject(id: string): void {
    if (confirm('Are you sure you want to delete this project?')) {
      this.dataService.deleteProject(id).subscribe({
        next: () => {
          console.log('Project deleted successfully');
          // Recharger les projets
          this.projects$ = this.dataService.getProjects();
        },
        error: (err) => {
          console.error('Error deleting project:', err);
          alert('Error deleting project');
        }
      });
    }
  }
}