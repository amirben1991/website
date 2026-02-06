import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
  constructor(private http: HttpClient) {}

  sendMessage(message: string): Observable<ChatSendResponse> {
    return this.http.post<ChatSendResponse>('/api/chat/send', { message });
  }

  getHistory(): Observable<ChatHistoryItem[]> {
    return this.http.get<ChatHistoryItem[]>('/api/chat/history');
  }

  clearHistory(): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>('/api/chat/history');
  }
}
