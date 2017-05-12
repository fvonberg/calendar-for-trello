import { Component } from "@angular/core";
import {NgRedux} from "@angular-redux/store";
import {NgReduxRouter} from "@angular-redux/router";
import {RootState} from "./shared/redux/store/index";
import reducer from "./shared/redux/reducers/index";
import {Settings} from "./shared/models/settings";
import {TrelloPullService} from "./shared/services/trello-pull.service";

@Component({
    selector: "ns-app",
    templateUrl: "app.component.html",
})
export class AppComponent {

    private initStore: RootState = {
        cards: [],
        boards: [],
        user: null,
        calendar: {
            days: [],
            date: null
        },
        settings: new Settings(),
        lists: {},
        members: {}
    };

    constructor(private ngRedux: NgRedux<RootState>, private ngReduxRouter: NgReduxRouter,
        private trelloPullService: TrelloPullService) {
        // this.ngRedux.configureStore(
        //     reducer,
        //     this.initStore,
        //     [],
        //     enhancers
        // );
        this.ngRedux.configureStore(
            reducer,
            this.initStore,
            []
        );
        ngReduxRouter.initialize();
        this.trelloPullService.pull();
    }
}
