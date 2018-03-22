import { NgModule } from "@angular/core";

import {ContatoBuscaComponent} from './contato-busca.component'
import {ContatosListaComponent} from './contatos-lista.component'
import {CommonModule} from '@angular/common'
import {contatoRoutingModule} from './contato-routing.module'
import {ContatoDetalhe} from './contato-detalhe.component'
import { ContatoService } from "./contato.service";
import {FormsModule} from '@angular/forms';

@NgModule({
    imports:[
        CommonModule,
        contatoRoutingModule,
        FormsModule
    ],
    declarations: [
        ContatoBuscaComponent,
        ContatosListaComponent,
        ContatoDetalhe
    ],
    exports:[
        ContatoBuscaComponent,
        ContatosListaComponent
    ],
    providers:[
        ContatoService
    ]
})
export class ContatosModule{

}