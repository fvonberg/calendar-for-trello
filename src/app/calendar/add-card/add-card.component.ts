import {Component, OnInit} from "@angular/core";
import {Card} from "../../shared/models/card";
import {select} from "@angular-redux/store";
import {Observable, Subscription} from "rxjs";
import {Board} from "../../shared/models/board";
import {TrelloHttpService} from "../../shared/services/trello-http.service";
import {Member} from "../../shared/models/member";
import {List} from "../../shared/models/list";
import * as moment from "moment";
import {MdDialogRef} from "@angular/material";
import {FormGroup, Validators, FormBuilder} from "@angular/forms";
import {selectOpenBoards} from "../../shared/redux/store/selects";


@Component({
  selector: 'app-add-card',
  templateUrl: './add-card.component.html',
  styleUrls: ['./add-card.component.scss']
})
export class AddCardComponent implements OnInit {

  public card: Card = new Card();
  public boards: Board[] = [];
  public members: Member[] = [];
  public lists: List[] = [];
  private cardForm: FormGroup;
  private subscriptions: Subscription[] = [];

  constructor(public dialogRef: MdDialogRef<AddCardComponent>, private tHttp: TrelloHttpService, private formBuilder: FormBuilder) {
  }

  @select(selectOpenBoards) public boards$: Observable<Board[]>;

  ngOnInit() {
    this.subscriptions.push(this.boards$.subscribe(boards => this.boards = boards));

    this.cardForm = this.formBuilder.group({
      name: [this.card ? this.card.name : '', Validators.required],
      due: [this.card && this.card.due ? this.card.due : moment().format("YYYY-MM-DD HH:mm").replace(" ", "T"), []],
      desc: [this.card && this.card.desc ? this.card.desc : ''],
      idBoard: [this.card && this.card.idBoard ? this.card.idBoard : null, [Validators.required]],
      idList: [this.card && this.card.idList ? this.card.idList : null, [Validators.required]],
      idMembers: [this.card && this.card.idMembers ? this.card.idList : []],
    });


    this.subscriptions.push(this.cardForm.get("idBoard").valueChanges.subscribe(boardId => {

      // reset values
      this.members = [];
      this.lists = [];
      this.cardForm.get("idList").setValue(null);
      this.cardForm.get("idMembers").setValue(null);


      this.tHttp.get("boards/" + boardId + "/members")
        .subscribe(
          success => this.members = success.json(),
          error => this.members = []
        );
      this.tHttp.get("boards/" + boardId + "/lists")
        .subscribe(
          success => this.lists = success.json(),
          error => this.lists = []
        );
    }));

  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }


  onSubmit(cardForm: FormGroup) {
    if (cardForm && cardForm.valid) {
      this.tHttp.post("cards/", cardForm.value)
        .subscribe(
          success => this.dialogRef.close(true),
          error => {
            throw new Error(error)
          }
        )
    }
  }

}
