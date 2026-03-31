import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Article {
  title: string;
  summary: string;
  url: string;
  date: string;
  tags: string[];
  logo?: string;
}

@Component({
  standalone: true,
  selector: 'app-articles',
  imports: [CommonModule],
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent {
  articles: Article[] = [];
}
