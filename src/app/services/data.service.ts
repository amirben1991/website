import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Education, Experience, Project } from '../models';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private education$ = new BehaviorSubject<Education[]>([
    {
      id: '1',
      school: 'Jedha AI School',
      degree: 'Certificate',
      field: 'Data Science & Engineering',
      startDate: new Date('2021-09-01'),
      endDate: new Date('2021-12-15'),
      description: 'Research focused on machine learning and data analysis.'
    },
    {
      id: '2',
      school: 'IAE Paris Sorbonne Business School',
      degree: 'Master',
      field: 'Management and Business Administration',
      startDate: new Date('2017-09-01'),
      endDate: new Date('2019-06-30'),
      description: 'Specialized in project management and business development.'
    },
    {
      id: '3',
      school: 'Université Nice Sophia Antipolis',
      degree: 'Bachelor',
      field: 'Communication and Media Studies',
      startDate: new Date('2011-09-01'),
      endDate: new Date('2016-06-30'),
      description: 'Focused on digital media and communication strategies.'
    }
  ]);

  private experience$ = new BehaviorSubject<Experience[]>([
    {
      id: '1',
      company: 'BPCE Solutions Informatiques',
      position: 'Fullstack Developer',
      startDate: new Date('2024-09-24'),
      endDate: undefined,
      description: 'Working on developing and maintaining web applications for banking solutions.',
      techStack: ['Angular', 'TypeScript', 'Java', 'RxJS', 'Spring Boot', 'Jenkins', 'Bitbucket']
    },

    {
      id: '2',
      company: 'M2I Formation',
      position: 'Full Stack Java Angular Developer (Internship)',
      startDate: new Date('2024-05-01'),
      endDate: new Date('2024-08-31'),
      description: 'Developed a full-stack web application for managing training courses and student enrollments.',
      techStack: ['Angular', 'Node.js', 'MongoDB', 'Express']
    },

    {
      id: '3',
      company: 'Quantmetry',
      position: 'Machine Learning Engineer',
      startDate: new Date('2023-02-01'),
      endDate: new Date('2023-05-31'),
      description: 'Developed machine learning models for predictive analytics in various business domains.',
      techStack: ['HTML5', 'CSS3', 'JavaScript', 'jQuery', 'python', 'scikit-learn', 'pandas', 'NumPy']
    }
  ]);

  private projects$ = new BehaviorSubject<Project[]>([
    {
      id: '1',
      title: 'E-Commerce Platform',
      description: 'A full-featured e-commerce application with product catalog, shopping cart, and payment integration.',
      techStack: ['Angular', 'Node.js', 'MongoDB', 'Stripe API'],
      GitHubLink: 'https://github.com/user/ecommerce-platform',
      liveURL: 'https://ecommerce-demo.com',
      imageURL: 'https://via.placeholder.com/400x300?text=E-Commerce',
      featured: true
    },
    {
      id: '2',
      title: 'Portfolio Website',
      description: 'A modern personal portfolio website showcasing projects and skills with smooth animations.',
      techStack: ['Angular', 'Tailwind CSS', 'TypeScript'],
      GitHubLink: 'https://github.com/user/portfolio',
      liveURL: 'https://myportfolio.com',
      imageURL: 'https://via.placeholder.com/400x300?text=Portfolio',
      featured: true
    },
    {
      id: '3',
      title: 'Task Management App',
      description: 'A collaborative task management tool with real-time updates and team features.',
      techStack: ['Angular', 'Firebase', 'Material Design'],
      GitHubLink: 'https://github.com/user/task-manager',
      liveURL: 'https://taskmanager-app.com',
      imageURL: 'https://via.placeholder.com/400x300?text=Task+Manager',
      featured: false
    }
  ]);

  getEducation(): Observable<Education[]> {
    return this.education$.asObservable();
  }

  getExperience(): Observable<Experience[]> {
    return this.experience$.asObservable();
  }

  getProjects(): Observable<Project[]> {
    return this.projects$.asObservable();
  }
}

