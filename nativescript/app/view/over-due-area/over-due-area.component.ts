import {Component, OnDestroy, OnInit} from "@angular/core";
import {Observable, Subscription} from "rxjs";
import {Card} from "../../models/card";
import {selectOverdueCards} from "../../redux/store/selects";
import {select} from "@angular-redux/store";

@Component({
  selector: 'app-over-due-area',
  moduleId: module.id,
  templateUrl: './over-due-area.component.html'
})
export class OverDueAreaComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];
  @select(selectOverdueCards) cards$: Observable<Card[]>;

  cards: Card[];

  constructor() {
  }

  ngOnInit() {
    this.subscriptions.push(
      this.cards$.subscribe(
        cards => {
          this.cards = cards;
        }
      )
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
