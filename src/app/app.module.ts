import {BrowserModule} from '@angular/platform-browser';
import {NgModule, ErrorHandler} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {routing} from "./routes";
import {CalendarService} from "./shared/services/calendar.service";
import {TrelloAuthService} from "./shared/services/trello-auth.service";
import {TrelloHttpService} from "./shared/services/trello-http.service";
import {SetTokenComponent} from "./components/set-token/set-token.component";
import {MemberGuard} from "./shared/services/guards/memberGuard";
import {VisitorGuard} from "./shared/services/guards/visitorGuard";
import {TrelloPullService} from "./shared/services/trello-pull.service";
import {DndModule} from "ng2-dnd";
import 'moment/locale/fr';
import 'moment/locale/de';
import {SearchComponent} from './components/search/search.component';
import {DateTimeFormatService} from "./shared/services/date-time-format.service";
import {SettingsModule} from "./settings/settings.module";
import {CalendarModule} from "./calendar/calendar.module";
import {ReduxModule} from "./shared/redux/redux.module";
import {
  MaterialModule, MdToolbarModule, MdCoreModule, MdButtonModule, MdSidenavModule, MdSelectModule, MdOption, MdSelect,
  MdListModule, MdCardModule
} from "@angular/material";
import {FrontPageModule} from "./front-page/front-page.module";
import {FlexLayoutModule} from "@angular/flex-layout";
import {AboutModule} from "./about/about.module";
import {SidebarComponent} from './sidebar/sidebar.component';
import {RavenErrorHandler} from "./w11k/RavenErrorHandler";
import {LoadingSpinnerComponent} from './loading-spinner/loading-spinner.component';
import {MemberActions} from "./shared/redux/actions/member-actions";


@NgModule({
  declarations: [
    AppComponent,
    SetTokenComponent,
    SearchComponent,
    SidebarComponent,
    LoadingSpinnerComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    routing,
    DndModule.forRoot(), // https://github.com/akserg/ng2-dnd/pull/90
    SettingsModule,
    CalendarModule,
    AboutModule,
    ReduxModule,
    FrontPageModule,
    MaterialModule,
    MdCoreModule,
    MdToolbarModule,
    MdButtonModule,
    MdSidenavModule,
    MdSelectModule,
    MdListModule,
    MdCardModule,
    FlexLayoutModule,
  ],
  providers: [
    CalendarService,
    TrelloAuthService,
    TrelloHttpService,
    MemberGuard,
    VisitorGuard,
    TrelloPullService,
    DateTimeFormatService,
    MemberActions,
    {provide: ErrorHandler, useClass: RavenErrorHandler}

  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
