import { Component, OnInit } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { CommonModule } from '@angular/common';
@Component({
    selector: 'app-page-head',
    imports: [NgOptimizedImage, CommonModule
    ],
    templateUrl: './page-head.component.html',
    styleUrl: './page-head.component.scss'
})


export class PageHeadComponent implements OnInit{
  title!: string;
  description!: string;
  date!: Date;
  imageUrl!: string;
  catUrl!: string;
  userInput!: string;

  ngOnInit() : void {
    this.title = "Welcome to my personnal website: ";
    this.description = "Currently fullstack developer in the banking industry";
    this.date = new Date();
    this.imageUrl = "https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg";
    console.log(this.imageUrl)
  }

  getUserInput() {
    const input = prompt("Please enter your name");
    if (input !== null && input.trim() !== '') {
      this.userInput = `Welcome, ${input}!`;
    }
  }
}
