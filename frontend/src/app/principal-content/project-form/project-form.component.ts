import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { Project } from '../../models';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrl: './project-form.component.scss',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule]
})
export class ProjectFormComponent implements OnInit {
  projectForm: FormGroup;
  isEditMode: boolean = false;
  projectId: string | null = null;
  isLoading: boolean = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.projectForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required]],
      techStack: [''],
      githubLink: [''],
      liveUrl: [''],
      imageUrl: [''],
      featured: [false]
    })
  }

  ngOnInit(): void {
    this.projectId = this.route.snapshot.paramMap.get('id');
    if (this.projectId) {
      this.isEditMode = true;
      this.loadProject(this.projectId);
    }
  }

  loadProject(id: string): void {
    this.isLoading = true;
    this.dataService.getProjectById(id).subscribe({
      next: (project: Project) => {
        this.projectForm.patchValue({
          title: project.title,
          description: project.description,
          techStack: project.techStack,
          githubLink: project.githubLink,
          liveUrl: project.liveUrl,
          imageUrl: project.imageUrl,
          featured: project.featured

        });
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Error loading project data.';
        this.isLoading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.projectForm.invalid) {
      this.errorMessage = 'Please correct the errors in the form.';
      return;
    }

    this.isLoading = true;
    const formData = this.projectForm.value;

    if (this.isEditMode && this.projectId) {
      this.dataService.updateProject(this.projectId, formData).subscribe({
        next: () => {
          this.router.navigate(['/projects']);
        },
        error: (err) => {
          this.errorMessage = err.error.error || 'Failed to update project.';
          this.isLoading = false;

        }
      });
    } else {
      this.dataService.createProject(formData).subscribe({
        next: () => {
          this.router.navigate(['/projects']);
        },
        error: (err) => {
          this.errorMessage = err.error.error || 'Failed to create project.';
          this.isLoading = false;
        }
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/projects']);
  }
}
