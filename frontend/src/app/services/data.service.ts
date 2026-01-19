import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Education, Experience, Project } from '../models';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  private apiUrl = 'http://localhost:8081/api';
  private education$: Observable<Education[]>;
  private experience$: Observable<Experience[]>;
  private projects$: Observable<Project[]>;

  constructor(private http: HttpClient) {
    this.education$ = this.http.get<Education[]>(`${this.apiUrl}/education`);
    this.experience$ = this.http.get<Experience[]>(`${this.apiUrl}/experience`);
    this.projects$ = this.http.get<Project[]>(`${this.apiUrl}/projects`);
  }

  getEducation$(): Observable<Education[]> {
    return this.education$;
  }

  getExperience$(): Observable<Experience[]> {
    return this.experience$;
  }

  getProjects$(): Observable<Project[]> {
    return this.projects$;
  }

  // Backwards compatibility aliases (optional)
  getEducation(): Observable<Education[]> {
    return this.getEducation$();
  }

  getExperience(): Observable<Experience[]> {
    return this.getExperience$();
  }

  getProjects(): Observable<Project[]> {
    return this.getProjects$();
  } 

}

