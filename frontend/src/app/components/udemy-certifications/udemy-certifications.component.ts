import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface UdemyCertification {
  title: string;
  platform: string;
  date: string;
  url: string;
  logo?: string;
}

@Component({
  standalone: true,
  selector: 'app-udemy-certifications',
  imports: [CommonModule],
  templateUrl: './udemy-certifications.component.html',
  styleUrls: ['./udemy-certifications.component.scss']
})
export class UdemyCertificationsComponent {
  certifications: UdemyCertification[] = [
    {
      title: 'Angular - The Complete Guide (2025 Edition)',
      platform: 'Udemy',
      date: '2024',
      url: 'https://www.udemy.com/course/the-complete-guide-to-angular-2/',
      logo: 'https://www.google.com/s2/favicons?domain=angular.io&sz=64'
    },
    {
      title: 'Spring Boot 3, Spring 6 & Hibernate for Beginners',
      platform: 'Udemy',
      date: '2024',
      url: 'https://www.udemy.com/course/spring-hibernate-tutorial/',
      logo: 'https://www.google.com/s2/favicons?domain=spring.io&sz=64'
    },
    {
      title: 'Docker & Kubernetes: The Practical Guide',
      platform: 'Udemy',
      date: '2024',
      url: 'https://www.udemy.com/course/docker-kubernetes-the-practical-guide/',
      logo: 'https://www.google.com/s2/favicons?domain=docker.com&sz=64'
    },
    {
      title: 'Machine Learning A-Z: AI, Python & R + ChatGPT Bonus',
      platform: 'Udemy',
      date: '2023',
      url: 'https://www.udemy.com/course/machinelearning/',
      logo: 'https://www.google.com/s2/favicons?domain=python.org&sz=64'
    }
  ];
}
