// needed to make @angular-redux work
global.process = { env: {} };
declare const global:any;
// this import should be first in order to load some required settings (like globals and reflect-metadata)
import { platformNativeScriptDynamic } from "nativescript-angular/platform";
// needed to use nativescript localstorage plugin
import "nativescript-localstorage";
import { AppModule } from "./app.module";

platformNativeScriptDynamic().bootstrapModule(AppModule);


