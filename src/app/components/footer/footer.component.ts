import { Component } from '@angular/core';

@Component({
    selector: 'w-footer',
    imports: [],
    templateUrl: './footer.component.html',
    styles: ``
})
export class FooterComponent {
    currentYear = new Date().getFullYear();
}
