import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";

import {MemberGuard} from "./shared/services/guards/memberGuard";
import {VisitorGuard} from "./shared/services/guards/visitorGuard";
import {LoginComponent} from "./view/login/login.component";
import {OverDueAreaComponent} from "./view/over-due-area/over-due-area.component";
import {HomeComponent} from "./view/home/home.component";
import { AboutComponent } from "./view/about/about.component";

const routes: Routes = [
    { path: "", redirectTo: "/start", pathMatch: "full"},
    { path: "start", canActivate: [VisitorGuard], component: LoginComponent },
    { path: "home", component: HomeComponent,
      children: [
        { path: "overdue", canActivate: [MemberGuard], component: OverDueAreaComponent },
        { path: "about", canActivate: [MemberGuard], component: AboutComponent },
      ]
    },
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
