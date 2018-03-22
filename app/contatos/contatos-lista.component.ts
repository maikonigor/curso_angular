import {Component, OnInit} from '@angular/core';
import {Contato} from './contato.model';
import {ContatoService} from './contato.service';
import {DialogService} from "../dialog.service";

@Component({
    moduleId: module.id,
    selector: 'contatos-lista',
    templateUrl: 'contatos-lista.component.html'
})
export class ContatosListaComponent implements OnInit{
    contatos:Contato[] = [];
    mensagem:{};
    classesCss: {};

    constructor(
        private contatoService:ContatoService,
        private dialogService:DialogService
    ){}
   
    ngOnInit(): void{
        this.contatoService.getContatos()
            .then((contatos:Contato[])=>{
                this.contatos = contatos;
            }).catch(err=> this.mostrarMensagem({tipo: 'danger', mensagem: "Ocorreu um erro ao buscar os contatos"}))
    }

    onDelete(contato:Contato):void{
        this.dialogService.confirm("Deseja deletar o contato "+ contato.nome + "?")
            .then((canDelete:boolean) => {
                if(canDelete){                    
                    this.contatoService
                        .delete(contato)
                        .then((c:Contato) =>{
                            this.contatos = this.contatos.filter((c:Contato) => c.id != contato.id);
                            this.mostrarMensagem(
                                {
                                    tipo: 'success',
                                    mensagem: 'Contato '+ c.nome + " excluído!"
                                }
                            );
                        })
                        .catch(err =>{
                            console.log(err);
                            this.mostrarMensagem(
                                {
                                    tipo: 'danger',
                                    mensagem: "Ocorreu um erro ao deletar o contato"
                                }
                            );
                        })
                    
                }
            })
    }

    private mostrarMensagem(mensagem:{tipo:string, mensagem:string}):void{
        this.mensagem = mensagem;
        this.montarClasses(mensagem.tipo);
        if(mensagem.tipo != 'danger'){
            setTimeout(()=>{
                this.mensagem = undefined;
            },3000);
        }
    }

    private montarClasses(tipo:string):void{
        this.classesCss = {
            alert: true,
        }

        this.classesCss["alert-"+ tipo] = true;
        /*
        {
            alert: true,
            alert-succes: true,
            alert-danger: false
            ...
        }
        */
    }
}

