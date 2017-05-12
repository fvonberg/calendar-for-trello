import { Component, ViewChild, OnInit, OnDestroy } from "@angular/core";
import {TrelloTokenService} from "../../services/trello-token.service";
import {Router} from "@angular/router";
import { DrawerService } from "../../services/drawer.service";
import { RadSideDrawerComponent } from "nativescript-telerik-ui/sidedrawer/angular";
import { Observable } from "rxjs/Observable";
import { User } from "../../shared/models/user";
import { Subscription } from "rxjs";
import {select} from "@angular-redux/store";

@Component({
    selector: "ns-home",
    moduleId: module.id,
    templateUrl: "./home.component.html",
    styleUrls: ["home.component.css"]
})
export class HomeComponent implements OnInit, OnDestroy {
    @ViewChild(RadSideDrawerComponent) public drawerComponent: RadSideDrawerComponent;
    @select("user") public user$: Observable<User>;
    public user: User;
    private subscriptions: Subscription[] = [];

    constructor(private router: Router, private trelloTokenService: TrelloTokenService, private drawerService: DrawerService) {}

    ngAfterViewInit() {
        this.drawerService.drawer = this.drawerComponent.sideDrawer;
    }

    ngOnInit() {
        this.subscriptions.push(this.user$.subscribe(
        user => this.user = user
        ));
    }

    ngOnDestroy() {
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }

    navigateTo(nav: string) {
        this.closeDrawer();
        this.router.navigate([nav]);
    }

    logout() {
        this.closeDrawer();
        this.trelloTokenService.logout();
        this.router.navigate(["/start"]);
    }

    closeDrawer() {
        if(this.drawerComponent.sideDrawer) {
            this.drawerComponent.sideDrawer.closeDrawer();
        }
    }
}
