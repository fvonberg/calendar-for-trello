import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from "@angular/core";
import {LoadEventData, WebView} from "tns-core-modules/ui/web-view";
import app = require("application");
import platform = require("platform");
import {Router} from "@angular/router";
import {LOGIN_CONFIG, TrelloTokenService} from "../../services/trello-token.service";
import {TrelloPullService} from "../../shared/services/trello-pull.service";
const config = require("../../shared/config.json");

@Component({
    selector: "ns-login",
    moduleId: module.id,
    templateUrl: "./login.component.html",
})
export class LoginComponent implements OnInit, AfterViewInit, OnDestroy {

    @ViewChild('webView') webView: ElementRef;
    trelloLoginSrc = 'https://trello.com/1/authorize?response_type=token&key=' + config.apiKey +
        '&return_url='+ LOGIN_CONFIG.redirectUrl +
        '&callback_method=fragment&scope=read%2Cwrite%2Caccount&expiration=30days&name=Calendar+for+Trello';

    constructor(private router: Router, private tokenService: TrelloTokenService, private trelloPullService: TrelloPullService) { }

    ngOnInit(): void {
    }

    ngAfterViewInit() {
        let webView: WebView = this.webView.nativeElement;
        webView.on(WebView.loadFinishedEvent, (args: LoadEventData) => {
            if (!args.error) {
                let tokenRegex = /#token=([\w\d]*)/;
                let number = args.url.search(tokenRegex);
                if (number != -1) {
                    let result = args.url.match(tokenRegex);
                    this.tokenService.setToken(result[1]);
                    this.trelloPullService.pull();
                    this.router.navigate(['/home/overdue']);
                }
            }
        });
    }

    ngOnDestroy() {
    }
}
