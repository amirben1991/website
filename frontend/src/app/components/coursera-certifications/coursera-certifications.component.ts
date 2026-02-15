import { Component } from '@angular/core';

export interface CourseraCertification {
  title: string;
  platform: string;
  date: string;
  url: string;
}

@Component({
  standalone: true,
  selector: 'app-coursera-certifications',
  templateUrl: './coursera-certifications.component.html',
  styleUrls: ['./coursera-certifications.component.scss']
})
export class CourseraCertificationsComponent {
  certifications: CourseraCertification[] = [
    {
      title: 'Machine Learning',
      platform: 'Coursera',
      date: '2025-11-10',
      url: 'https://coursera.org/verify/ml-cert-123'
    },
    {
      title: 'Deep Learning Specialization',
      platform: 'Coursera',
      date: '2026-01-15',
      url: 'https://coursera.org/verify/dl-cert-456'
    }
    // Ajoute d'autres certifications ici
  ];
}
