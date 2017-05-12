import {Component, OnDestroy, OnInit} from "@angular/core";
import {Observable, Subscription} from "rxjs";
import {Card} from "../../models/card";
import {selectOverdueCards} from "../../redux/store/selects";
import {select} from "@angular-redux/store";

@Component({
  selector: 'app-about',
  moduleId: module.id,
  templateUrl: './about.component.html'
})
export class AboutComponent {
}
