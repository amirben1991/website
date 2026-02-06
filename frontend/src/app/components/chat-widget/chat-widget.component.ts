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
    // Écoute les événements de login pour réinitialiser Jarvis
    this.authService.loginEvent$.subscribe(() => {
      this.resetJarvis();
    });

    // Ouvre automatiquement le widget si l'utilisateur est connecté
    this.authService.isAuthenticated$.subscribe(isAuth => {
      if (isAuth && !this.isOpen) {
        setTimeout(() => {
          this.isOpen = true;
          this.loadHistoryOrWelcome();
        }, 500);
      }
    });
  }

  /**
   * Réinitialise Jarvis : supprime l'historique et affiche le message de bienvenue
   */
  async resetJarvis() {
    try {
      await this.chat.clearHistory().toPromise();
      this.messages = [];
      this.messages.push({
        role: 'assistant',
        content: "Bonjour ! Je suis Jarvis, l'assistant personnel de PrinceDev. Je suis là pour répondre à vos questions sur son portfolio, ses projets, son expérience et ses compétences. Que souhaitez-vous savoir ?"
      });
      this.scrollToBottom();
    } catch (e) {
      console.error('Erreur lors de la réinitialisation de Jarvis:', e);
    }
  }

  async loadHistoryOrWelcome() {
    try {
      const history = await this.chat.getHistory().toPromise();
      if (history && history.length > 0) {
        this.messages = history.map(this.mapHistoryToUi);
      } else {
        // Aucun historique : message de bienvenue de Jarvis
        this.messages.push({
          role: 'assistant',
          content: "Bonjour ! Je suis Jarvis, l'assistant personnel de PrinceDev. Je suis là pour répondre à vos questions sur son portfolio, ses projets, son expérience et ses compétences. Que souhaitez-vous savoir ?"
        });
      }
      this.scrollToBottom();
    } catch (e) {
      // En cas d'erreur, affiche quand même le message de bienvenue
      this.messages.push({
        role: 'assistant',
        content: "Bonjour ! Je suis Jarvis, l'assistant personnel de PrinceDev. Que puis-je faire pour vous aujourd'hui ?"
      });
      this.scrollToBottom();
    }
  }

  toggleWidget() {
    if (!this.isOpen) {
      this.isOpen = true;
      this.isMinimized = false;
      if (this.messages.length === 0) {
        this.loadHistoryOrWelcome();
      }
    } else {
      this.isOpen = false;
    }
  }

  toggleMinimize() {
    this.isMinimized = !this.isMinimized;
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
