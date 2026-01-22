import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { Experience } from '../../models';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-experience-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './experience-form.component.html',
  styleUrl: './experience-form.component.scss'
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
    const formValue = this.experienceForm.value;
    
    // Convertir les dates string en format ISO pour le backend
    const experienceData: any = {
      company: formValue.company,
      position: formValue.position,
      startDate: formValue.startDate,
      endDate: formValue.endDate || null,
      description: formValue.description,
      techStack: formValue.techStack // Envoyer comme string directement, pas en array
    };

    console.log('Sending experience data:', experienceData);

    const request = this.isEditMode
      ? this.dataService.updateExperience(this.experienceId!, experienceData)
      : this.dataService.createExperience(experienceData);

    request.subscribe({
      next: () => {
        this.router.navigate(['/experience']);
      },
      error: (err) => {
        console.error('Error saving experience:', err);
        this.errorMessage = err.error?.message || 'Error saving experience. Please try again.';
        this.isLoading = false;
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/experience']);
  }

  private formatDateForInput(dateInput: string | Date): string {
    if (!dateInput) return '';
    const date = dateInput instanceof Date ? dateInput : new Date(dateInput);
    return date.toISOString().split('T')[0];
  }
}
