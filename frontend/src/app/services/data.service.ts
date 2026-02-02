import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Education, Experience, Project } from '../models';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'http://localhost:8081/api';
  constructor(private http: HttpClient) {}

  // Admin - Audit Log
  getAllAuditLogs(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/admin/audit-logs`);
  }

  promoteUser(id: string): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/admin/users/${id}/role`, { role: 'ADMIN' });
  }

  demoteUser(id: string): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/admin/users/${id}/role`, { role: 'USER' });
  }

  getEducation$(): Observable<Education[]> {
    return this.http.get<Education[]>(`${this.apiUrl}/education`);
  }

  getExperience$(): Observable<Experience[]> {
    return this.http.get<Experience[]>(`${this.apiUrl}/experience`);
  }

  getProjects$(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.apiUrl}/projects`);
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


// Experience
createExperience(experience: any): Observable<Experience> {
  return this.http.post<Experience>(`${this.apiUrl}/experience`, experience);
}

updateExperience(id: string, experience: any): Observable<Experience> {
  return this.http.put<Experience>(`${this.apiUrl}/experience/${id}`, experience);
}

deleteExperience(id: string): Observable<void> {
  return this.http.delete<void>(`${this.apiUrl}/experience/${id}`);
}

getExperienceById(id: string): Observable<Experience> {
  return this.http.get<Experience>(`${this.apiUrl}/experience/${id}`);
}

// Admin - User Management
getAllUsers(): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/admin/users`);
}

deleteUser(id: string): Observable<any> {
  return this.http.delete<any>(`${this.apiUrl}/admin/users/${id}`);
}

}

/**
 * @deprecated Use the DataService method instead.

