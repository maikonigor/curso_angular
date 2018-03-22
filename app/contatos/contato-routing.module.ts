import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {ContatosListaComponent} from './contatos-lista.component';
import {ContatoDetalhe} from './contato-detalhe.component';

const contatoRoutes: Routes = [
    {
        path: 'contato',
       component: ContatosListaComponent
    },
    {
        path: 'contato/save',
        component: ContatoDetalhe
    },
    {
        path: 'contato/save/:id',
        component: ContatoDetalhe
    }

]
@NgModule({
    imports: [
        RouterModule.forChild(contatoRoutes)
    ],

    exports: [
        RouterModule
    ]
})
export class contatoRoutingModule{

}