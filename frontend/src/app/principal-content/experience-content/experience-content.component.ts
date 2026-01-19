import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { DataService } from '../../services/data.service';
import { Experience } from '../../models';


@Component({
    standalone: true,
    selector: 'app-experience-content',
    imports: [CommonModule, RouterModule],
    templateUrl: './experience-content.component.html',
    styleUrl: './experience-content.component.scss'
})
export class ExperienceContentComponent implements OnInit {
    experience$: Observable<Experience[]>;

    constructor(private dataService: DataService) {
        this.experience$ = this.dataService.getExperience();
    }

    ngOnInit(): void {
        // Optional: logging for debugging
        this.experience$.subscribe(data => {
            console.log('Experience data loaded:', data);
        })
    }
}
