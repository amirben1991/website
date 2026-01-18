import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
    standalone: true, 
    selector: 'app-principal-content',
    imports: [RouterModule],
    templateUrl: './principal-content.component.html',
    styleUrl: './principal-content.component.scss'
})
export class PrincipalContentComponent {}
