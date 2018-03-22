import {Injectable} from "@angular/core";
import { resolve } from "url";

@Injectable()
export class DialogService{

    confirm(message?:string){
        return new Promise(resolve => {
            return resolve(window.confirm(message || "Confirmar ação?"));
        });
    }
}