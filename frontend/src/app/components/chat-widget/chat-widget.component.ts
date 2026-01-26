import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChatService, ChatHistoryItem } from '../../services/chat.service';
import { AuthService } from '../../services/auth.service';

type UiRole = 'user' | 'assistant';

interface UiMessage {
  role: UiRole;
  content: string;
}

@Component({
  selector: 'app-chat-widget',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat-widget.component.html',
  styleUrls: ['./chat-widget.component.scss']
})
export class ChatWidgetComponent {
  @ViewChild('scrollContainer') private scrollContainer?: ElementRef<HTMLDivElement>;

  messages: UiMessage[] = [];
  input: string = '';
  loading = false;
  error: string | null = null;
  isOpen = false;
  isMinimized = false;

  constructor(
    private chat: ChatService,
    public authService: AuthService
  ) {}

  async ngOnInit() {
    // Load history only when widget opens
  }

  toggleWidget() {
    if (!this.isOpen) {
      this.isOpen = true;
      this.isMinimized = false;
      this.loadHistory();
    } else {
      this.isOpen = false;
    }
  }

  toggleMinimize() {
    this.isMinimized = !this.isMinimized;
  }

  async loadHistory() {
    try {
      const history = await this.chat.getHistory().toPromise();
      if (history) {
        this.messages = history.map(this.mapHistoryToUi);
        this.scrollToBottom();
      }
    } catch (e) {
      // history may be empty
    }
  }

  async send() {
    const text = this.input.trim();
    if (!text || this.loading) return;
    this.error = null;
    this.loading = true;
    this.messages.push({ role: 'user', content: text });
    this.input = '';
    this.scrollToBottom();

    try {
      const res = await this.chat.sendMessage(text).toPromise();
      const reply = res?.reply ?? '';
      this.messages.push({ role: 'assistant', content: reply });
      this.scrollToBottom();
    } catch (e: any) {
      this.error = e?.error?.message || 'Une erreur est survenue.';
    } finally {
      this.loading = false;
    }
  }

  onKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.send();
    }
  }

  private mapHistoryToUi(item: ChatHistoryItem): UiMessage {
    const role: UiRole = item.role?.toLowerCase() === 'assistant' ? 'assistant' : 'user';
    return { role, content: item.content };
  }

  private scrollToBottom() {
    queueMicrotask(() => {
      if (this.scrollContainer?.nativeElement) {
        const el = this.scrollContainer.nativeElement;
        el.scrollTop = el.scrollHeight;
      }
    });
  }
}
