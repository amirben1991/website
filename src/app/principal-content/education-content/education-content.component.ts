import { Component } from '@angular/core';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
@Component({
    standalone: true,
    selector: 'app-education-content',
    imports: [MatMenuModule, MatButtonModule, RouterModule],
    templateUrl: './education-content.component.html',
    styleUrl: './education-content.component.scss'
})
export class EducationContentComponent {

    constructor (private router: Router){}

    goToEducation() {
        this.router.navigate(['/principal/education']);
    }
   
}
