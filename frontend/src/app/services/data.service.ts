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



// Projects
createProject(project: any): Observable<Project> {
  return this.http.post<Project>(`${this.apiUrl}/projects`, project);
}

updateProject(id: string, project: any): Observable<Project> {
  return this.http.put<Project>(`${this.apiUrl}/projects/${id}`, project);
}

deleteProject(id: string): Observable<void> {
  return this.http.delete<void>(`${this.apiUrl}/projects/${id}`);
}

getProjectById(id: string): Observable<Project> {
  return this.http.get<Project>(`${this.apiUrl}/projects/${id}`);
}

// Education
createEducation(Education: any): Observable<Education> {
  return this.http.post<Education>(`${this.apiUrl}/education`, Education);
}

updateEducation(id: string, Education: any): Observable<Education> {
  return this.http.put<Education>(`${this.apiUrl}/education/${id}`, Education);
}

deleteEducation(id: string): Observable<void> {
  return this.http.delete<void>(`${this.apiUrl}/education/${id}`);
}

getEducationById(id: string): Observable<Education> {
  return this.http.get<Education>(`${this.apiUrl}/education/${id}`);
}


}

