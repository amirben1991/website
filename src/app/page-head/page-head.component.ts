import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-head',
  standalone: true,
  imports: [
    PageHeadComponent
  ],
  templateUrl: './page-head.component.html',
  styleUrl: './page-head.component.scss'
})


export class PageHeadComponent implements OnInit{
  title!: string;
  description!: string;
  date!: Date;
  imageUrl!: string;
  userInput!: string;

  ngOnInit() : void {
    this.title = "Welcome to my personnal website: ";
    this.description = "This is where you can visit my profile, and have an extended view about my skills";
    this.date = new Date();
    this.imageUrl = "https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg";
  }

  getUserInput() {
    const input = prompt("Please enter your name");
    if (input !== null && input.trim() !== '') {
      this.userInput = `Welcome, ${input}!`;
    }
  }
}
