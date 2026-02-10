import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface ChatSendResponse {
  reply: string;
}

export interface ChatHistoryItem {
  id?: number;
  role: 'USER' | 'ASSISTANT' | string;
  content: string;
  createdAt?: string;
}

@Injectable({ providedIn: 'root' })
export class ChatService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  sendMessage(message: string): Observable<ChatSendResponse> {
    return this.http.post<ChatSendResponse>(`${this.apiUrl}/chat/send`, { message });
  }

  getHistory(): Observable<ChatHistoryItem[]> {
    return this.http.get<ChatHistoryItem[]>(`${this.apiUrl}/chat/history`);
  }

  clearHistory(): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/chat/history`);
  }
}
