import { Component, ElementRef, Renderer2, signal, ViewChild } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { FaIconComponent } from "@fortawesome/angular-fontawesome";
import { faBars, faClose } from '@fortawesome/free-solid-svg-icons';
import { NgbCollapse, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';

@Component({
    selector: 'w-header',
    imports: [NgbCollapse, NgbNavModule, RouterLink, RouterLinkActive, FaIconComponent],
    templateUrl: './header.component.html',
    styles: ``
})
export class HeaderComponent {
    @ViewChild('headerCollapse') headerCollapse: ElementRef;
    @ViewChild('headerToggleBtn') headerToggleBtn: ElementRef;

    @ViewChild('navHeader') navHeader: ElementRef;

    collapseOnScrollSub: () => void;

    isCollapsed = signal(true);

    bars = faBars;
    close = faClose;

    collapseOnRouteChangeSub: Subscription;

    constructor(private renderer: Renderer2, private router: Router) {
        // Bind listener to collapse the header when touching outside of it
        this.collapseOnScrollSub = this.renderer.listen('window', 'scroll', (e: Event) => this.onScrollFn.call(this));
        // Bind listener to collapse the header when navigating to a new page
        this.collapseOnRouteChangeSub = this.router.events.subscribe(() => this.isCollapsed.set(true));
    }

    ngAfterViewInit() {
        // Init the shrink logic for the Desktop navbar 
        this.navbarShrinkFn();
    }

    ngOnDestroy() {
        this.collapseOnRouteChangeSub.unsubscribe();
        this.collapseOnScrollSub();
    }

    onScrollFn() {
        this.isCollapsed.set(true);
        this.navbarShrinkFn();
    }

    // Shrink the navbar when page is scrolled
    navbarShrinkFn() {
        if (window.scrollY > 0) {
            this.navHeader.nativeElement.classList.add('navbar-scrolled', 'shadow');
        } else {
            this.navHeader.nativeElement.classList.remove('navbar-scrolled', 'shadow');
        }
    }

}
