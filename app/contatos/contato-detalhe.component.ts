import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {Location} from '@angular/common';
import { ContatoService } from './contato.service';
import {Contato} from './contato.model';
import { containsTree } from '@angular/router/src/url_tree';
@Component({
    moduleId:module.id,
    selector: 'contato-detalhe',
    templateUrl: 'contatos-detalhe.component.html'
})
export class ContatoDetalhe implements OnInit{
    private contato: Contato;
    private isNew: boolean = true;
    constructor(
        private contatoService: ContatoService,
        private route: ActivatedRoute, 
        private location: Location,
    )
    {}
    ngOnInit() :void{
        this.contato = new Contato(0, "","","");
        this.route.params.forEach((params: Params)=>{
            let id: number = +params['id'];
            
            if(id){
                this.isNew = false;
                this.contatoService.getContato(id)
                    .then((contato: Contato)=>{
                        this.contato = contato;
                    });
            }
        })
    }

    getFormGroupClass(isValid:boolean, isPristine:boolean): {} {
        return{
            "form-group": true,
            'has-danger': (!isValid && !isPristine),
            'has-success': (isValid && !isPristine)
        }
    }

    getFormControlClass(isValid:boolean, isPristine:boolean): {} {
        return{
            'form-control': true,
            'form-control-danger': (!isValid && !isPristine),
            'form-control-success': (isValid && !isPristine)
        }
    }

    onSubmit(): void{
        let promisse;

        if(this.isNew){
            promisse = this.contatoService.create(this.contato);
        }else{
            promisse = this.contatoService.update(this.contato);
        }

        promisse.then(contato => this.location.back());

    }

    goBack():void{
        this.location.back();
    }
}