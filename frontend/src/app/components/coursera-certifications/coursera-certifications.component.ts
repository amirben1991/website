import { Component } from '@angular/core';

export interface CourseraCertification {
  title: string;
  platform: string;
  date: string;
  url: string;
  logo?: string;
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
      url: 'https://www.coursera.org/professional-certificates/ibm-full-stack-cloud-developer',
      logo: 'https://www.google.com/s2/favicons?domain=ibm.com&sz=64'
    },
    {
      title: 'DevOps and Software Engineering Professional Certificate (En cours)',
      platform: 'Coursera',
      date: 'En cours',
      url: 'https://www.coursera.org/professional-certificates/devops-and-software-engineering',
      logo: 'https://www.google.com/s2/favicons?domain=ibm.com&sz=64'
    },
    {
      title: 'Java Developer Professional Certificate (En cours)',
      platform: 'Coursera',
      date: 'En cours',
      url: 'https://www.coursera.org/professional-certificates/java-developer',
      logo: 'https://www.google.com/s2/favicons?domain=aws.amazon.com&sz=64'
    },
    {
      title: 'IBM Data Engineer Professional Certificate (En cours)',
      platform: 'Coursera',
      date: 'En cours',
      url: 'https://www.coursera.org/professional-certificates/ibm-data-engineer',
      logo: 'https://www.google.com/s2/favicons?domain=ibm.com&sz=64'
    }
  ];
}
