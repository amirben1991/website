import { Component } from '@angular/core';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { NavbarComponent } from '../../components/navbar/navbar.component';


@Component({
    standalone: true,
    selector: 'app-education-content',
    imports: [MatMenuModule, MatButtonModule, NavbarComponent],
    templateUrl: './education-content.component.html',
    styleUrl: './education-content.component.scss'
})
export class EducationContentComponent {
  
}
