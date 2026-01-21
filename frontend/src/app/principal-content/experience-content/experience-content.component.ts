import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { Experience } from '../../models';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-experience-form',
  templateUrl: './experience-content.component.html',
  styleUrl: './experience-content.component.scss',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule]
})
export class ExperienceFormComponent implements OnInit {
  experienceForm: FormGroup;
  isEditMode: boolean = false;
  experienceId: string | null = null;
  isLoading: boolean = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.experienceForm = this.fb.group({
      company: ['', [Validators.required, Validators.minLength(2)]],
      position: ['', [Validators.required, Validators.minLength(2)]],
      startDate: ['', [Validators.required]],
      endDate: [''],
      description: ['', [Validators.required]],
      techStack: ['']
    })
  }

  ngOnInit(): void {
    this.experienceId = this.route.snapshot.paramMap.get('id');
    if (this.experienceId) {
      this.isEditMode = true;
      this.loadExperience(this.experienceId);
    }
  }

  loadExperience(id: string): void {
    this.isLoading = true;
    this.dataService.getExperienceById(id).subscribe({
      next: (experience: Experience) => {
        // Convertir le techStack array en string séparé par des virgules
        const techStackString = Array.isArray(experience.techStack) 
          ? experience.techStack.join(', ') 
          : experience.techStack;

        this.experienceForm.patchValue({
          company: experience.company,
          position: experience.position,
          startDate: this.formatDateForInput(experience.startDate),
          endDate: experience.endDate ? this.formatDateForInput(experience.endDate) : '',
          description: experience.description,
          techStack: techStackString
        });
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Error loading experience data.';
        this.isLoading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.experienceForm.invalid) {
      this.errorMessage = 'Please correct the errors in the form.';
      return;
    }

    this.isLoading = true;
    const formData = this.experienceForm.value;
    
    // Convertir techStack string en array
    formData.techStack = formData.techStack 
      ? formData.techStack.split(',').map((tech: string) => tech.trim())
      : [];

    if (this.isEditMode && this.experienceId) {
      this.dataService.updateExperience(this.experienceId, formData).subscribe({
        next: () => {
          this.router.navigate(['/experience']);
        },
        error: (err) => {
          this.errorMessage = err.error.error || 'Failed to update experience.';
          this.isLoading = false;
        }
      });
    } else {
      this.dataService.createExperience(formData).subscribe({
        next: () => {
          this.router.navigate(['/experience']);
        },
        error: (err) => {
          this.errorMessage = err.error.error || 'Failed to create experience.';
          this.isLoading = false;
        }
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/experience']);
  }

  // Helper function to format dates for input[type="date"]
  private formatDateForInput(date: Date | string): string {
    if (!date) return '';
    const d = new Date(date);
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${d.getFullYear()}-${month}-${day}`;
  }
}