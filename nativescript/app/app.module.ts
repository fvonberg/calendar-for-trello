import {NgModule, NO_ERRORS_SCHEMA} from "@angular/core";
import {NativeScriptModule} from "nativescript-angular/nativescript.module";
import {AppRoutingModule} from "./app.routing";
import {AppComponent} from "./app.component";
import {LoginComponent} from "./view/login/login.component";
import {VisitorGuard} from "./services/guards/visitorGuard";
import {MemberGuard} from "./services/guards/memberGuard";
import {ReduxModule} from "./redux/redux.module";
import {TrelloTokenService} from "./services/trello-token.service";
import {OverDueAreaComponent} from "./view/over-due-area/over-due-area.component";
import {TrelloPullService} from "./services/trello-pull.service";
import {TrelloHttpService} from "./services/trello-http.service";
import { NativeScriptHttpModule } from "nativescript-angular/http";
import {MemberActions} from "./redux/actions/member-actions";
import {CalendarCardComponent} from "./common-components/calendar-card/calendar-card.component";
import {HomeComponent} from "./view/home/home.component";
import {SIDEDRAWER_DIRECTIVES} from "nativescript-telerik-ui/sidedrawer/angular";
import {MainActionBarComponent} from "./common-components/action-bar/actionbar.component";
import { DrawerService } from "./services/nativescript/drawer.service";
import { AboutComponent } from "./view/about/about.component";
import { IfAndroidDirective } from "./common-components/ns-directives/if-platform-directives";
import { IfIosDirective } from "./common-components/ns-directives/if-platform-directives";

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        NativeScriptHttpModule,
        AppRoutingModule,
        ReduxModule
    ],
    declarations: [
        SIDEDRAWER_DIRECTIVES,
        MainActionBarComponent,
        AppComponent,
        LoginComponent,
        OverDueAreaComponent,
        CalendarCardComponent,
        HomeComponent,
        AboutComponent,
        IfAndroidDirective,
        IfIosDirective,
    ],
    providers: [
        MemberGuard,
        MemberActions,
        VisitorGuard,
        TrelloTokenService,
        TrelloPullService,
        TrelloHttpService,
        DrawerService,
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
