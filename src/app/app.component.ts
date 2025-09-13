import { Component } from '@angular/core';
import { Router, RouterOutlet, RoutesRecognized } from '@angular/router';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import packageJson from '../../package.json';
import { DEFAULT_SUB_HEADING } from './app.routes';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from "./components/header/header.component";
import { manageAuth } from './utils/auth-util';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styles: '',
    imports: [RouterOutlet, HeaderComponent, FooterComponent, NgbNavModule]
})
export class AppComponent {

    isHomePage: boolean;

    heading: string;
    subHeading: string;
    isSubHeadingVisible: boolean = true;
    headingsSub: Subscription;

    constructor(private router: Router) {
        manageAuth();

        // listen to page variable from router events
        this.headingsSub = this.router.events.subscribe(event => {
            if (event instanceof RoutesRecognized) {
                let route = event.state.root.firstChild;

                this.isHomePage = route.routeConfig.path == '';

                if (!route.data['subHeading']) {
                    this.isSubHeadingVisible = false;
                    this.subHeading = DEFAULT_SUB_HEADING;
                } else {
                    this.isSubHeadingVisible = true;
                    this.subHeading = route.data['subHeading'];
                }

                this.heading = route.data['heading'];
            }
        });

        console.log("Version: " + packageJson.version);
    }

    ngOnDestroy() {
        this.headingsSub.unsubscribe();
    }

}
