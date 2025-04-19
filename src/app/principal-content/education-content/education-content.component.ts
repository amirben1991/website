import { Component } from '@angular/core';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';

@Component({
    selector: 'app-education-content',
    imports: [MatMenuModule, MatButtonModule],
    templateUrl: './education-content.component.html',
    styleUrl: './education-content.component.scss'
})
export class EducationContentComponent {
  
}
