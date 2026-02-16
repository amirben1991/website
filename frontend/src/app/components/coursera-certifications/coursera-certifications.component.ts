import { Component } from '@angular/core';

export interface CourseraCertification {
  title: string;
  platform: string;
  date: string;
  url: string;
}

import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-coursera-certifications',
  imports: [CommonModule],
  templateUrl: './coursera-certifications.component.html',
  styleUrls: ['./coursera-certifications.component.scss']
})
export class CourseraCertificationsComponent {
  certifications: CourseraCertification[] = [
    {
      title: 'IBM Fullstack Software Developer Professional Certificate (En cours)',
      platform: 'Coursera',
      date: 'En cours',
      url: 'https://www.coursera.org/professional-certificates/ibm-full-stack-cloud-developer'
    }
  ];
}
