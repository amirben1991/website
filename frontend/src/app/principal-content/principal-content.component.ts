import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    standalone: true, 
    selector: 'app-principal-content',
    imports: [RouterModule, TranslateModule],
    templateUrl: './principal-content.component.html',
    styleUrl: './principal-content.component.scss'
})
export class PrincipalContentComponent {}
