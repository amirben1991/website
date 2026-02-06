import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  currentLang = 'fr';

  constructor(
    public authService: AuthService, 
    private router: Router,
    private translate: TranslateService
  ) {
    // Récupérer la langue sauvegardée ou utiliser le français par défaut
    this.currentLang = localStorage.getItem('lang') || 'fr';
    this.translate.use(this.currentLang);
  }

  ngOnInit(): void {
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  switchLanguage(): void {
    this.currentLang = this.currentLang === 'fr' ? 'en' : 'fr';
    this.translate.use(this.currentLang);
    localStorage.setItem('lang', this.currentLang);
  }
}