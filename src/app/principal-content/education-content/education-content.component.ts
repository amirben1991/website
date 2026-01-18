import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DataService } from '../../services/data.service';
import { Education } from '../../models';
import { Observable } from 'rxjs';

@Component({
    standalone: true,
    selector: 'app-education-content',
    imports: [CommonModule, RouterModule],
    templateUrl: './education-content.component.html',
    styleUrl: './education-content.component.scss'
})
export class EducationContentComponent implements OnInit {

    education$: Observable<Education[]>;

    constructor(private dataService: DataService) {
        this.education$ = this.dataService.getEducation();
    }

    ngOnInit(): void {
        // Optional: logging for debugging
        this.education$.subscribe(data => {
            console.log('Education data loaded:', data);
        })
    }

}
