import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { Education } from '../../models';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-education-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './education-form.component.html',
  styleUrl: './education-form.component.scss'
})
export class EducationFormComponent implements OnInit {
  educationForm: FormGroup;
  isEditMode: boolean = false;
  educationId: string | null = null;
  isLoading: boolean = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.educationForm = this.fb.group({
      school: ['', [Validators.required, Validators.minLength(2)]],
      degree: ['', [Validators.required, Validators.minLength(2)]],
      field: ['', [Validators.required, Validators.minLength(2)]],
      startDate: ['', [Validators.required]],
      endDate: [''],
      description: ['']
    })
  }

  ngOnInit(): void {
    this.educationId = this.route.snapshot.paramMap.get('id');
    if (this.educationId) {
      this.isEditMode = true;
      this.loadEducation(this.educationId);
    }
  }

  loadEducation(id: string): void {
    this.isLoading = true;
    this.dataService.getEducationById(id).subscribe({
      next: (education: Education) => {
        this.educationForm.patchValue({
          school: education.school,
          degree: education.degree,
          field: education.field,
          startDate: this.formatDateForInput(education.startDate),
          endDate: education.endDate ? this.formatDateForInput(education.endDate) : '',
          description: education.description
        });
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Error loading education data.';
        this.isLoading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.educationForm.invalid) {
      this.errorMessage = 'Please correct the errors in the form.';
      return;
    }

    this.isLoading = true;
    const formValue = this.educationForm.value;
    
    const educationData: any = {
      school: formValue.school,
      degree: formValue.degree,
      field: formValue.field,
      startDate: formValue.startDate,
      endDate: formValue.endDate || null,
      description: formValue.description
    };

    console.log('Sending education data:', educationData);

    const request = this.isEditMode
      ? this.dataService.updateEducation(this.educationId!, educationData)
      : this.dataService.createEducation(educationData);

    request.subscribe({
      next: () => {
        this.router.navigate(['/education']);
      },
      error: (err) => {
        console.error('Error saving education:', err);
        this.errorMessage = err.error?.message || 'Error saving education. Please try again.';
        this.isLoading = false;
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/education']);
  }

  private formatDateForInput(dateInput: string | Date): string {
    if (!dateInput) return '';
    const date = dateInput instanceof Date ? dateInput : new Date(dateInput);
    return date.toISOString().split('T')[0];
  }
}