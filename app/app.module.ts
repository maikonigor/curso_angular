import './util/rxjs-extensions'
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from "./app.component";
import {BrowserModule} from '@angular/platform-browser';
import {ContatosModule} from './contatos/contatos.module';
import {DialogService} from "./dialog.service";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {NgModule} from '@angular/core';

import {InMemoryWebApiModule} from "angular-in-memory-web-api";
import {InMemoryDataService} from "./in-memory-data-service";

@NgModule({
    imports:[
        AppRoutingModule,
        BrowserModule, 
        ContatosModule,
        FormsModule,
        HttpModule,
        InMemoryWebApiModule.forRoot(InMemoryDataService)
    ],
    providers:[
        DialogService
    ],
    declarations: [AppComponent],
    bootstrap:[AppComponent]
})
export class AppModule{}