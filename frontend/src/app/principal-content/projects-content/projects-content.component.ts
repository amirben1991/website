import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';
import { Project } from '../../models';
import { Observable } from 'rxjs';


@Component({
    standalone: true,
    selector: 'app-projects-content',
    imports: [RouterModule, CommonModule],
    templateUrl: './projects-content.component.html',
    styleUrl: './projects-content.component.scss'
})
export class ProjectsContentComponent implements OnInit {

  projects$: Observable<Project[]>;

  constructor(private dataService: DataService) {
    this.projects$ = this.dataService.getProjects();
  }

  ngOnInit(): void {
    // Optional: logging for debugging
    this.projects$.subscribe(data => {
        console.log('Projects data loaded:', data);
    })
  }
}
