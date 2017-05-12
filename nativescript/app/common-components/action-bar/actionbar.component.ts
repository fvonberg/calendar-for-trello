import {Component, Input} from '@angular/core';
import { DrawerService } from "../../services/nativescript/drawer.service";

@Component({
  moduleId: module.id,
  selector: 'MainActionBar',
  templateUrl: 'actionbar.component.html'
})
export class MainActionBarComponent {

  @Input() public title: String;

  constructor(private drawerService: DrawerService) {
  }

  toggle() {
    this.drawerService.toggle();
  }
}