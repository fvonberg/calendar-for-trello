import {Component, OnInit, Input, HostBinding} from "@angular/core";
import {Card} from "../../models/card";
import {select} from "@angular-redux/store";
import {Observable, Subscription} from "rxjs";
import {Board} from "../../models/board";
import * as _ from "lodash";
import {List} from "../../models/list";
import {selectBoardColorPrefs} from "../../redux/store/selects";
import {MemberMap} from "../../redux/reducers/member.reducer";
import * as application from "tns-core-modules/application";
import * as platform from "tns-core-modules/platform";
import * as dialogs from "tns-core-modules/ui/dialogs";

@Component({
  selector: 'calendar-card',
  moduleId: module.id,
  templateUrl: './calendar-card.component.html',
  styleUrls: ['./calendar-card.component.css']
})
export class CalendarCardComponent implements OnInit {

  public list: List;
  public board: Board;
  private subscriptions: Subscription[] = [];
  public memberMap: MemberMap;

  @select(selectBoardColorPrefs) public boardColorPrefs$: Observable<Object>;
  @select("boards") public boards$: Observable<Board[]>;
  @select("lists") public lists$: Observable<Object>;
  @select("members") public members$: Observable<MemberMap>;

  @HostBinding('style.border-left-color') borderLeft;
  @HostBinding('class.dueComplete') dueComplete;
  @Input() public card: Card;

  constructor() {
  }

  getAvatar(userId: string) {
    return this.memberMap ? (this.memberMap[userId] ? this.memberMap[userId].avatarHash : "" ) : "";
  }

  ngOnInit() {
    this.subscriptions.push(
      Observable
        .combineLatest(this.boardColorPrefs$, this.boards$, this.lists$)
        .subscribe(x => {
          const boardColorPrefs = x[0];
          const boards: Board[] = x[1];
          const lists = x[2];
          this.list = lists ? lists[this.card.idList] : "";
          this.board = _.find(boards, (board: Board) => board.id === this.card.idBoard);
          this.borderLeft = boardColorPrefs[this.card.idBoard] || (this.board ? this.board.prefs.backgroundColor : null);
        }));

    this.subscriptions.push(
      this.members$.subscribe(
        memberMap => this.memberMap = memberMap
      )
    );

    this.dueComplete = this.card.dueComplete;
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  openCard() {
    if (application.android) {
      try
      {
          let intent = new android.content.Intent(android.content.Intent.ACTION_VIEW, android.net.Uri.parse(this.card.url));
          application.android.currentContext.startActivity(android.content.Intent.createChooser(intent, "Open Card..."));
      }
      catch (e)
      {
          console.log("Missing URL application");
      }
    } else if (application.ios) {
        console.log("We are running on iOS device");
        dialogs.alert("Sorry, this is not implemented yet. :-(").then(function() {
            console.log("Dialog closed!");
        });
    }
  }

}
