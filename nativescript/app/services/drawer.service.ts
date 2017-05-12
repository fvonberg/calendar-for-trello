import {Injectable} from '@angular/core';
import {SideDrawerType} from 'nativescript-telerik-ui/sidedrawer/angular';

@Injectable()
export class DrawerService {

    public drawer: SideDrawerType;

    public toggle(force?: boolean) {
        if (this.drawer) {
            if (typeof force !== 'undefined') {
                if (force === false) {
                    this.drawer.closeDrawer();
                }
            } else {
                this.drawer.toggleDrawerState();
            }
        } else {
            console.log("DrawerService.toggle: this.drawer was undefined");
        }
    }
}