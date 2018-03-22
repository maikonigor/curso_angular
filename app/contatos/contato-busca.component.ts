import 'rxjs/Rx'
import { Component, OnInit, Input, Output, OnChanges, SimpleChange, SimpleChanges} from '@angular/core';
import {Router} from "@angular/router";
import {Contato} from './contato.model';
import { ContatoService } from './contato.service';
import { Observable,Subject } from 'rxjs/Rx';
import { debounceTime } from 'rxjs/operator/debounceTime';
import { EventEmitter } from '@angular/core';




@Component({
    moduleId: module.id,
    selector: 'contato-busca',
    templateUrl: 'contato-busca.component.html',
    styles: [`
        .cursor-pointer:hover{
            cursor:pointer
        }
    `]
})

export class ContatoBuscaComponent implements OnInit, OnChanges {
    @Input() busca: string;
    @Output() buscaChange:EventEmitter<string> = new EventEmitter<string>();

    contatos:Observable<Contato[]>;
    private termosDaBusca:Subject<any> = new Subject<any>();
    
    constructor(
        private contatoService:ContatoService,
        private router: Router
    ) { }

    ngOnInit() {
        this.contatos = this.termosDaBusca
                        .debounceTime(300) //aguarda 300ms para emitir novos eventos
                        .distinctUntilChanged() // ignore se o proximo termo de busca for igual ao anterior
                        .switchMap(term => {
                            console.log("fez a busca");
                            return term ? this.contatoService.search(term) : Observable.of<Contato[]>([]);
                        });
        this.contatos.subscribe((contatos:Contato[])=>{
            console.log("Resposta da busca ", contatos);
        });
     }

     ngOnChanges(changes:SimpleChanges):void{
        let busca:SimpleChange = changes['busca'];
        
        this.search(busca.currentValue);
     }

    search(termo:string):void{
        this.termosDaBusca.next(termo);
        this.buscaChange.emit(termo);
    }

    verDetalhe(contato:Contato){
        let link = ['contato/save',contato.id];
        this.router.navigate(link);
        this.buscaChange.emit("");
    }
}